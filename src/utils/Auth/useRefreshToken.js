export default () => {
  const refreshToken = localStorage.getItem('refreshToken')

  const setRefreshToken = (newRefresh) => {
    localStorage.setItem('refreshToken', newRefresh)
  }

  return [
    refreshToken,
    setRefreshToken
  ]
}
