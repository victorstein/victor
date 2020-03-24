
const verifyEmail = value => {
  var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (emailRex.test(value)) {
    return true
  }
  return false
}

export const ValidatorFormChange = (event, setState, state, type) => {
  switch (type) {
    case 'password':
      if (event.target.value === '') {
        return setState({
          labelError: 'Password email is required',
          error: true,
          value: event.target.value,
          className: 'has-danger'
        })
      } else {
        return setState({
          labelError: '',
          error: false,
          value: event.target.value,
          className: 'has-success'
        })
      }

    case 'email':
      if (event.target.value === '') {
        return setState({
          labelError: 'Input email is required',
          error: true,
          value: event.target.value,
          className: 'has-danger'
        })
      }
      if (verifyEmail(event.target.value)) {
        return setState({
          labelError: '',
          error: false,
          value: event.target.value,
          className: 'has-success'
        })
      } else {
        return setState({
          labelError: 'Please enter a valid email',
          error: true,
          value: event.target.value,
          className: 'has-danger'
        })
      }
    default: break
  }
}
