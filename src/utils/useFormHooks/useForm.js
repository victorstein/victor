import { useState, useEffect } from 'react'
import Joi from '@hapi/joi'

const validationForm = (values, schemaValidation, onBlurState) => {
  const errors = {}
  const classNames = {}
  try {
    const result = schemaValidation.validate(values, { abortEarly: false })
    // console.log(values)
    // console.log(result)
    result.error.details.map((inputError) => {
      if (onBlurState[inputError.path[0]]) {
        errors[inputError.path[0]] = inputError.message
        classNames[inputError.path[0]] = 'has-danger'
      }
    })
    for (const property in onBlurState) {
      if (onBlurState[property] && !errors[property]) {
        classNames[property] = '' // 'has-success'
      } else if (!errors[property]) {
        classNames[property] = ''
      }
    }
    return {
      errors,
      classNames
    }
  } catch (e) {
    return {
      errors,
      classNames
    }
  }
}

const useForm = (submitForm, defaultValues, schema) => {
  const [values, setValues] = useState(defaultValues)
  const [schemaValidation] = useState(Joi.object(schema))
  const [onBlurState, setOnBlurState] = useState({})
  const [errors, setErrors] = useState({})
  const [classNames, setClassNames] = useState({})

  useEffect(() => {
    const defaultClassNames = {}
    for (const property in defaultValues) {
      defaultClassNames[property] = ''
    }
    setClassNames(defaultClassNames)
  }, [])

  const handleSubmit = (event) => {
    const newBlurState = {}
    for (const property in defaultValues) {
      newBlurState[property] = true
    }
    const { errors, classNames } = validationForm(values, schemaValidation, newBlurState)
    setErrors(errors)
    setClassNames(classNames)
    setOnBlurState(newBlurState)
    if (Object.keys(errors).length === 0) {
      if (event) event.preventDefault()
      submitForm(values)
    }
    if (event) event.preventDefault()
  }

  const handleChangeDatePicker = (value, inputName) => {
    let newDate = null
    if (value) {
      newDate = value.format('YYYY-MM-DD')
    }
    const { errors, classNames } = validationForm({
      ...values,
      [inputName]: newDate
    },
    schemaValidation,
    onBlurState)
    setErrors(errors)
    setClassNames(classNames)
    setValues(values => ({ ...values, [inputName]: newDate }))
  }

  const handleChangeReactSelect = (value, inputName) => {
    const newValue = value.value
    const { errors, classNames } = validationForm({
      ...values,
      [inputName]: newValue
    },
    schemaValidation,
    onBlurState)
    setErrors(errors)
    setClassNames(classNames)
    setValues(values => ({ ...values, [inputName]: newValue }))
  }

  const handleChange = (event) => {
    if (event.persist()) event.persist()
    const { errors, classNames } = validationForm({
      ...values,
      [event.target.name]: event.target.value
    },
    schemaValidation,
    onBlurState)
    setErrors(errors)
    setClassNames(classNames)
    setValues(values => ({ ...values, [event.target.name]: event.target.value }))
  }

  const handleBlurReactSelect = (event, targetName) => {
    event.persist()
    const newBlurState = {
      ...onBlurState, [targetName]: true
    }
    const { errors, classNames } = validationForm(values, schemaValidation, newBlurState)
    setErrors(errors)
    setClassNames(classNames)
    setOnBlurState(newBlurState)
  }

  const handleBlurReactDate = (date, name) => {
    const newBlurState = {
      ...onBlurState, [name]: true
    }
    const { errors, classNames } = validationForm(values, schemaValidation, newBlurState)
    setErrors(errors)
    setClassNames(classNames)
    setOnBlurState(newBlurState)
  }

  const handleBlur = (event) => {
    event.persist()
    const newBlurState = {
      ...onBlurState, [event.target.name]: true
    }
    const { errors, classNames } = validationForm(values, schemaValidation, newBlurState)
    setErrors(errors)
    setClassNames(classNames)
    setOnBlurState(newBlurState)
  }

  return {
    handleChange,
    handleChangeReactSelect,
    handleChangeDatePicker,
    handleSubmit,
    handleBlur,
    handleBlurReactDate,
    handleBlurReactSelect,
    onBlurState,
    values,
    errors,
    classNames
  }
}

export default useForm
