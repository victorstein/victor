import gql from 'graphql-tag'

export const createUserGql = (arrryData = '') => {
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
      ${arrryData}
    }
  }
  `
  return gql`${schema}`
}
