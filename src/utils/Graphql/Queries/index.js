import gql from 'graphql-tag'

export const loginGql = (arrryData = '') => {
  const schema = `query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        ${arrryData}
    }
  }
`
  return gql`${schema}`
}
