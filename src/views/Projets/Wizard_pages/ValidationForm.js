
export const ValidatorFormChange = (value, state, setState, type) => {
  switch (type) {
    case 'nameTemplate' :
      if (!value) {
        return setState({
          labelError: 'Name is required',
          error: true,
          value: value,
          className: 'has-danger'
        })
      } else {
        return setState({
          labelError: '',
          error: false,
          value: value,
          className: 'has-success'
        })
      }
    case 'descriptionTemplate' :
      if (!value) {
        return setState({
          labelError: 'Description is required',
          error: true,
          value: value,
          className: 'has-danger'
        })
      } else {
        return setState({
          labelError: '',
          error: false,
          value: value,
          className: 'has-success'
        })
      }
    default: break
  }
}
