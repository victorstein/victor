import { InMemoryCache } from 'apollo-boost'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'
import { ApolloLink, Observable } from 'apollo-link'
import { onError } from 'apollo-link-error'

const URI = process.env.REACT_APP_APOLLO_URI || 'http://localhost:302000/graphql'

const httpLink = createUploadLink({
  uri: URI
})

const WHITE_LINKS = [
  'login',
  'signup'
]

const refreshToken = async () => {
  // Get the token from LS
  const token = localStorage.getItem('refreshToken')
  const data = JSON.stringify({
    query: `{  refreshToken(refreshToken: "${token || 'invalid'}")}`
  })
  let newToken
  newToken = await fetch(URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  })
  newToken = await newToken.json()

  if (newToken.errors) {
    return false
  }
  localStorage.setItem('token', newToken.data.refreshToken)
  return true
}

const errorHandler = onError(({ graphQLErrors, operation, forward, response }) => {
  let { operationName } = operation
  if (operationName) {
    operationName = operationName.toLowerCase()
  }
  if (WHITE_LINKS.indexOf(operationName) > -1) {
    return forward(operation)
  } else if (graphQLErrors) {
    const errorMessage = graphQLErrors[0].extensions.code
    // UNAUTHENTICATED
    if (errorMessage === 'UNAUTHENTICATED') {
      const token = localStorage.getItem('token')
      // Let's refresh token through async request
      return new Observable(observer => {
        refreshToken()
          .then(refreshResponse => {
            operation.setContext(({ headers = {} }) => ({
              headers: {
                // Re-add old headers
                ...headers,
                // Switch out old access token for new one
                authorization: `Bearer ${token}` || null
              }
            }))
          })
          .then(() => {
            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            }
            // Retry last failed request
            forward(operation).subscribe(subscriber)
          })
          .catch(error => {
            // No refresh or client token available, we force user to login
            observer.error(error)
          })
      })
    }
  }
})

const authLink = setContext(async (_, { headers }) => {
  // Get the token from LS
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const link = ApolloLink.from([
  errorHandler,
  authLink,
  httpLink
])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client
