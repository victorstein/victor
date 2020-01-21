import gql from 'graphql-tag'

export const loginGql = (data = '') => {
  const schema = `query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        ${data}
    }
  }
`
  return gql`${schema}`
}

export const refreshTokenGql = () => {
  const schema = `query refreshToken($refreshToken : String!){
    refreshToken(refreshToken : $refreshToken)
  }
`
  return gql`${schema}`
}

export const meGQL = (data = '') => {
  const schema = `query me{ me 
    {
      ${data}
    }
  }
`
  return gql`${schema}`
}

export const roleByIdGQL = (data = '') => {
  const schema = `query roleById( $id :  String!){
    roleById(id: $id){
      ${data}
    }
  }
`
  return gql`${schema}`
}
