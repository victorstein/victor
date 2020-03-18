import Joi from '@hapi/joi'

const schemaPageOne = {
  nameAccount: Joi.string()
    .label('Name Account')
    .required()
    .messages({
      'any.required': 'Name Account is required',
      'string.empty': 'Name Account is required'
    }),
  domainURL: Joi.string()
    .label('Domain UR')
    .required()
    .messages({
      'any.required': 'Domain UR is required',
      'string.empty': 'Domain UR is required'
    }),
  projectsName: Joi.string()
    .label('Projects Name')
    .required()
    .messages({
      'any.required': 'Projects Name is required',
      'string.empty': 'Projects Name is required'
    }),
  projectOwner: Joi.string()
    .label('Project Owner')
    .required()
    .messages({
      'any.required': 'Project Owner is required',
      'string.empty': 'ProjectOwner is required'
    }),
  seller: Joi.string()
    .label('Seller')
    .required()
    .messages({
      'any.required': 'Seller is required',
      'string.empty': 'Seller is required'
    }),
  developerName: Joi.string()
    .label('Developer Name')
    .required()
    .messages({
      'any.required': 'Developer Name is required',
      'string.empty': 'Developer Name is required'
    })
}

const schemaPageTwo = {
  userName: Joi.string()
    .label('Name Account')
    .required()
    .messages({
      'any.required': 'Name is required',
      'string.empty': 'Name is required'
    }),
  password: Joi
    .string()
    .required()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  // .pattern(new RegExp('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/'))
    .message('Please enter a valid password address.')
    .label('Password')
    .messages({
      'any.required': 'password is a required',
      'string.empty': 'password is a required'
    }),
  confirmPassword: Joi.required().valid(Joi.ref('password')).messages({ 'any.only': 'pasword not mach' })
}

export default {
  schemaPageOne,
  schemaPageTwo
}
