import gql from 'graphql-tag'

export const createUserGql = (data = '') => {
  const schema = `mutation signUp(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
    ){
      signUp(
        firstName : $firstName
        lastName: $lastName
        email: $email
        password : $password
        confirmPassword: $confirmPassword
      ){
      ${data}
    }
  }
  `
  return gql`${schema}`
}
