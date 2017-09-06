import validate from '../utils/validator'
import { Err, Ok } from 'space-lift'

export function model({
  constraints,
  defaultForm,
}) {
  const fields = defaultForm()
  const emptyErrors = makeDefaultErrors(constraints(fields))

  function initialState() {
    return {
      fields,
      errors: emptyErrors,
      valid: false,
      formShowing: null,
    }
  }

  return {
    scoped: true,
    state: initialState(),
    reducers: {
      resetForm() {
        return initialState()
      },
      initFields(state, fields) {
        return { fields: Object.assign({}, state.fields, fields) }
      },
      setFields(state, newFields) {
        const fields = Object.assign({}, state.fields, newFields)
        const newErrors = getErrorsForFields(newFields, constraints)
        const errors = Object.assign({}, state.errors, newErrors)
        const valid = isFormValid(fields, constraints)
        return { fields, errors, valid }
      },
      validateEntireForm(state) {
        const errors = validate(state.fields, constraints(state.fields))
        return {
          ...state,
          errors: errors || emptyErrors,
          valid: isFormValid(state.fields, constraints),
        }
      },
      validateFields(state, fields) {
        const fieldsToValidate = fields.reduce((prev, key) => {
          return {
            ...prev,
            [key]: state.fields[key],
          }
        }, {})
        const newErrors = getErrorsForFields(fieldsToValidate, constraints)
        const errors = Object.assign({}, state.errors, newErrors)
        return {
          errors,
          valid: isFormValid(state.fields, constraints),
        }
      },
      toggleFormShowing(state, { name }) {
        return name === state.formShowing ? { formShowing: null } : { formShowing: name }
      },
    },
    effects: {
      validateOnSubmit(_state, send) {
        const state = send.validateEntireForm()
        if (!state.valid) {
          return Err({
            type: 'validation_error',
            message: 'Invalid input',
            errors: state.errors,
          })
        } else {
          return Ok(state)
        }
      },
    },
  }
}

export function makeDefaultErrors(constraints) {
  const errors = Object.keys(constraints).reduce((prev, curr) => {
    return {
      ...prev,
      [curr]: [],
    }
  }, {})
  return errors
}

export function getErrorsForFields(fields, makeConstraints) {
  const constraints = makeConstraints(fields) || {}
  const keys = Object.keys(fields)
  const initialErrors = keys.reduce((prev, key) => ({ ...prev, [key]: [] }), {})

  const filteredConstraints = keys.reduce((prev, key) => {
    return constraints[key] ? { ...prev, [key]: constraints[key] } : prev
  }, {})
  const errors = validate(fields, filteredConstraints) || {}
  return { ...initialErrors, ...errors }
}

export function isFormValid(fields, makeConstraints) {
  const errors = getErrorsForFields(fields, makeConstraints)
  return Object.keys(errors).reduce((prev, key) => {
    return prev && !errors[key].length
  }, true)
}
