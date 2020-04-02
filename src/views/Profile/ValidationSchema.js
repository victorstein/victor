import Joi from '@hapi/joi'

const schemaProfile = {
  firstName: Joi
    .string()
    .required()
    .label('Name')
    .messages({
      'any.required': 'Name is a required',
      'string.empty': 'Name is a required'
    }),
  lastName: Joi
    .string()
    .required()
    .label('Last Name')
    .messages({
      'any.required': 'Last Name is a required',
      'string.empty': 'Last Name is a required'
    }),
  password: Joi
    .string().allow('', null)
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .message('Please enter a valid password address.')
    .label('Password')
    .messages({
      'any.required': 'password is a required',
      'string.empty': 'password is a required'
    }),
  confirmPassword: Joi.valid(Joi.ref('password')).messages({ 'any.only': 'pasword not mach' })
}

export default {
  schemaProfile
}
