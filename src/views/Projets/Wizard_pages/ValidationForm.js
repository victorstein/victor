
const verifyEmail = value => {
  var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (emailRex.test(value)) {
    return true
  }
  return false
}

const verifyPassword = value => {
  const phoneRGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  if (phoneRGEX.test(value)) {
    return true
  } else {
    return false
  }
}

export const ValidatorFormChange = (event, nameInput, valueConfirmPassWord) => {
  const { value } = event.target
  switch (nameInput) {
    case 'userName':
      if (!value) {
        return ({
          userNameInput: {
            labelError: 'User Name is required',
            error: true,
            value: value,
            className: 'has-danger'
          }
        })
      } else {
        return (
          {
            userNameInput: {
              labelError: '',
              error: false,
              value: value,
              className: 'has-success'
            }
          })
      }
    case 'developerEmail' :
      if (!value) {
        return ({
          developerEmailInput: {
            labelError: 'Developer email is required',
            error: true,
            value: value,
            className: 'has-danger'
          }
        })
      } else {
        if (verifyEmail(value)) {
          return ({
            developerEmailInput: {
              labelError: '',
              error: false,
              value: value,
              className: 'has-success'
            }
          })
        } else {
          return ({
            developerEmailInput: {
              labelError: 'Please enter a valid email address.',
              error: true,
              value: value,
              className: 'has-danger'
            }
          })
        }
      }
    case 'topic':
      if (!value) {
        return ({
          topicInput: {
            labelError: 'Topic is required',
            error: true,
            value: value,
            className: 'has-danger'
          }
        })
      } else {
        return (
          {
            topicInput: {
              labelError: '',
              error: false,
              value: value,
              className: 'has-success'
            }
          })
      }
    case 'password' :
      if (!value) {
        let newState = {}
        if (value !== valueConfirmPassWord) {
          newState = {
            confirmPasswordInput: {
              labelError: 'Passwords do not match',
              error: true,
              value: valueConfirmPassWord,
              className: 'has-danger'
            }
          }
        } else {
          if (valueConfirmPassWord === '') {
            newState = {
              labelError: 'Confirm password is required',
              error: true,
              value: valueConfirmPassWord,
              className: 'has-danger'
            }
          } else {
            newState = {
              confirmPasswordInput: {
                labelError: '',
                value: valueConfirmPassWord,
                error: false,
                className: 'has-success'
              }
            }
          }
        }
        return ({
          passwordInput: {
            labelError: 'User Name is required',
            error: true,
            value: value,
            className: 'has-danger'
          },
          ...newState
        })
      } else {
        let newState = {}
        if (value !== valueConfirmPassWord) {
          newState = {
            confirmPasswordInput: {
              labelError: 'Passwords do not match',
              error: true,
              value: valueConfirmPassWord,
              className: 'has-danger'
            }
          }
        } else {
          newState = {
            confirmPasswordInput: {
              labelError: '',
              error: false,
              value: valueConfirmPassWord,
              className: 'has-success'
            }
          }
        }

        if (!verifyPassword(value)) {
          return ({
            passwordInput: {
              labelError: 'The password does not meet the minimum requirements',
              error: true,
              value: value,
              className: 'has-danger'
            },
            ...newState
          })
        } else {
          return ({
            passwordInput: {
              labelError: '',
              error: false,
              value: value,
              className: 'has-success'
            },
            ...newState
          })
        }
      }
    case 'confirmPasswor' :
      if (!value) {
        return ({
          confirmPasswordInput: {
            labelError: 'Confirm password is required',
            error: true,
            value: value,
            className: 'has-danger'
          }
        })
      } else {
        if (valueConfirmPassWord !== value) {
          return ({
            confirmPasswordInput: {
              labelError: 'Passwords do not match',
              error: true,
              value: value,
              className: 'has-danger'
            }
          })
        } else {
          return ({
            confirmPasswordInput: {
              labelError: '',
              error: false,
              value: value,
              className: 'has-success'
            }
          })
        }
      }
    case 'language':
      if (!value) {
        return ({
          languageInput: {
            labelError: 'Language is required',
            error: true,
            value: value,
            className: 'has-danger'
          }
        })
      } else {
        return (
          {
            languageInput: {
              labelError: '',
              error: false,
              value: value,
              className: 'has-success'
            }
          })
      }
    default: break
  }
}
