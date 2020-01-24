export default (history) => {
    localStorage.clear()
    history.push('/auth/login')
}