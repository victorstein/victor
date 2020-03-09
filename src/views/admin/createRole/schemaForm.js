import Joi from '@hapi/joi'

const schema = {
  name: Joi.string()
    .required()
}

export default schema
