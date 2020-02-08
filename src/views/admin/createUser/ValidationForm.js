import Joi from 'joi-browser'

const errorCustom = (error) => {
  return error.map((error) => {
    const { type, flags: { label } } = error
    switch (type) {
      case 'string.email' :
        return { message: `Please enter a valid ${label} address.` }
      case 'any.required':
        return { message: `${label} is required` }
        //   case 'any.allowOnly':
        //     return { message: `El campo ${label} debe de ser igual al campo contraseña` }
      case 'string.regex.base':
        return { message: `Please enter a valid ${label} address.` }
      case 'any.empty':
        return { message: `${label} is required` }
      default:
        return error
    }
  })
}

export const Schema = {
  email: Joi
    .string()
    .email({ minDomainSegments: 3 })
    .regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    .required()
    .label('Email')
    .error((e) => errorCustom(e))
}
