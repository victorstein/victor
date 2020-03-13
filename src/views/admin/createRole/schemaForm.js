import Joi from '@hapi/joi'

const schema = {
  name: Joi.string()
    .required()
    .messages({
      'any.required': 'Name is required',
      'string.empty': 'Name is required'
    }),
  permissions: Joi.array()
    .items(Joi.string().required())
    .required()
    .messages({
      'any.required': 'Name is required',
      'array.includesRequiredUnknowns': 'Role Select is required'
    })

}

export default schema
