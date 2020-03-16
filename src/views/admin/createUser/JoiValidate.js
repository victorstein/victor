import Joi from '@hapi/joi'

const Schemas = Joi.object({
  email: Joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['net'] } })
    // .regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    .required()
    .label('Email')
    .messages({
      'string.email': 'Please enter a valid Email address.',
      'any.required': 'Email is a required',
      'string.empty': 'Email is a required'
    }),
  name: Joi
    .string()
    .required()
    .label('Name')
    .messages({
      'any.required': 'Name is a required',
      'string.empty': 'Name is a required'
    }),
  lastname: Joi
    .string()
    .required()
    .label('Last Name')
    .messages({
      'any.required': 'Name is a required',
      'string.empty': 'Name is a required'
    }),
  password: Joi
    .string()
    .required()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    // .pattern(new RegExp('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/'))
    .message('Please enter a valid password address.')
    .label('Password')
    .messages({
      'any.required': 'Name is a required',
      'string.empty': 'Name is a required'
    }),
  confirmPassword: Joi.required().valid(Joi.ref('password')).messages({ 'any.only': 'pasword not mach' })
})

const validationForm = (values) => {
  let errors = {}
  try {
    const result = Schemas.validate(values, { abortEarly: false })
    result.error.details.map((inputError) => {
      errors = {
        ...errors,
        [inputError.path[0]]: inputError.message
      }
    })

    return errors
  } catch (e) {
    console.log('catch ', e)
    return errors
  }
}

export default validationForm
