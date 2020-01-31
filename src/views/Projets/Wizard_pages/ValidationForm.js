
export const ValidatorFormChange = (event, nameInput) => {
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
    default: break
  }
}
