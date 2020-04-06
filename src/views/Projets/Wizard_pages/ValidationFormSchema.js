import Joi from '@hapi/joi'

const schemaPageOne = {
  siteName: Joi.string()
    .label('Name Account')
    .required()
    .messages({
      'any.required': 'Site Name is required',
      'string.empty': 'Site Name is required'
    }),
  accountName: Joi
    .string()
    .pattern(/^[a-z]+$/)
    .required()
    .strict()
    .trim()
    .min(8)
    .max(8)
    .label('Name Account')
    .messages({
      'any.required': 'Account Name is required',
      'string.empty': 'Account Name is required',
      'string.min': ' Account Username should be exactly 8 characters',
      'string.max': 'Account Username should be exactly 8 characters',
      'string.pattern.base': 'Account name cannot have special characters or uppercase letters'
    }),
  domainURL: Joi.string()
    .strict()
    .trim()
    .label('Domain UR')
    .required()
    .messages({
      'any.required': 'Domain UR is required',
      'string.empty': 'Domain UR is required'
    }),
  clientName: Joi.string()
    .label('Client Name')
    .required()
    .messages({
      'any.required': 'Client Name is required',
      'string.empty': 'Client Name is required'
    }),
  developerName: Joi.string()
    .label('Developer Name')
    .required()
    .messages({
      'any.required': 'Developer Name is required',
      'string.empty': 'Developer Name is required'
    }),
  password: Joi
    .string()
    .required()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .message('Please enter a valid password address.')
    .label('Password')
    .messages({
      'any.required': 'password is a required',
      'string.empty': 'password is a required'
    }),
  confirmPassword: Joi.required().valid(Joi.ref('password')).messages({ 'any.only': 'pasword not mach' })
}

const schemaPageTwo = {
  passwordWordpress: Joi.string()
    .required()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .message('Please enter a valid password address.')
    .label('Password')
    .messages({
      'any.required': 'password is a required',
      'string.empty': 'password is a required'
    }),
  confirmPasswordWordpress: Joi.required().valid(Joi.ref('passwordWordpress')).messages({ 'any.only': 'pasword not mach' }),
  language: Joi.string()
    .label('Language')
    .required()
    .messages({
      'any.required': 'Language is required',
      'string.empty': 'Language is required'
    }),
  theme: Joi.string()
    .label('Language')
    .required()
    .messages({
      'any.required': 'Language is required',
      'string.empty': 'Language is required'
    })
}

const schemaPageThree = {
  userName: Joi.string()
    .label('Name Account')
    .required()
    .messages({
      'any.required': 'Name is required',
      'string.empty': 'Name is required'
    }),
  developerEmail: Joi.string()
    .label('Developer Email')
    .email({ minDomainSegments: 2, tlds: { allow: ['net'] } })
    .required()
    .messages({
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
      'string.email': 'Email invalid'
    }),
  topic: Joi.string()
    .label('Topic')
    .required()
    .messages({
      'any.required': 'Topic is required',
      'string.empty': 'Topic is required'
    }),
  language: Joi.string()
    .label('Language')
    .required()
    .messages({
      'any.required': 'Language is required',
      'string.empty': 'Language is required'
    })
}

export default {
  schemaPageOne,
  schemaPageTwo,
  schemaPageThree
}
