import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

const serverLink = process.env.REACT_APP_APOLLO_URI || 'http://localhost:302000/graphql'
const httpLink = createUploadLink({ uri: serverLink })

const Client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
})

export default Client
