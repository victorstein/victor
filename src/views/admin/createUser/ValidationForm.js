import Joi from 'joi-browser'

const errorCustom = (error) => {
  return error.map((error) => {
    const { type, flags: { label } } = error
    switch (type) {
      case 'string.email' :
        return { message: `Please enter a valid ${label} address.` }
      case 'any.required':
        return { message: `${label} is required` }
      case 'string.regex.base':
        return { message: `Please enter a valid ${label} address.` }
      case 'any.empty':
        return { message: `${label} is required` }
      case 'any.allowOnly':
        return { message: 'password not match' }
      default:
        return error
    }
  })
}

export const Schemas = (typeSchema) => {
  switch (typeSchema) {
    case 'email' :
      return Joi.object().keys({
        email: Joi
          .string()
          .email({ minDomainSegments: 3 })
          .regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
          .required()
          .label('Email')
          .error((e) => errorCustom(e))
      })
    case 'name':
      return Joi.object().keys({
        name: Joi
          .string()
          .required()
          .label('Name')
          .error((e) => errorCustom(e))
      })
    case 'lastname':
      return Joi.object().keys({
        lastname: Joi
          .string()
          .required()
          .label('Last Name')
          .error((e) => errorCustom(e))
      })

    case 'password' :
      return Joi.object().keys({
        password: Joi
          .string()
          .required()
          .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
          .label('Password')
          .error((e) => errorCustom(e))
      })

    case 'confirmPassword' :
      return {
        confirmPassword: Joi
          .string()
          .required()
          .valid(Joi.ref('password'))
          .label('Confirm password')
          .error((e) => errorCustom(e)),
        password: Joi
          .string()
          .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
          .label('Password')
          .error((e) => errorCustom(e))
      }

    default: return null
  }
}
