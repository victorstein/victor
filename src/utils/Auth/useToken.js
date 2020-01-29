export default () => {
  const token = localStorage.getItem('token')

  const setToken = (newToken) => {
    localStorage.setItem('token', newToken)
  }

  return [
    token,
    setToken
  ]
}
