import { useState, useEffect } from 'react'

const useForm = (callback, defaultValues, validate) => {
  const [values, setValues] = useState(defaultValues)
  const [onBlurState, setOnBlurState] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
  }, [errors])

  const handleSubmit = (event) => {
    if (event) event.preventDefault()
    let newBlurState = {}
    for (var property in defaultValues) {
      newBlurState = {
        ...newBlurState,
        [property]: true
      }
    }
    setOnBlurState(newBlurState)
    setErrors(validate(values))
    setIsSubmitting(true)
  }

  const handleChange = (event) => {
    event.persist()
    setErrors(validate(
      {
        ...values,
        [event.target.name]: event.target.value
      }
    ))
    setValues(values => ({ ...values, [event.target.name]: event.target.value }))
  }

  const handleBlur = (event) => {
    event.persist()
    setOnBlurState(values => ({ ...values, [event.target.name]: true }))
    setErrors(validate(values))
  }

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    onBlurState,
    values,
    errors
  }
}

export default useForm
