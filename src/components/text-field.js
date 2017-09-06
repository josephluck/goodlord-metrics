import * as React from 'react'
import { Component } from 'react'
import parseNumber from '../utils/parse-number'

function sanitizeValue(type, value) {
  const val = type === 'number' ? parseNumber(value) : value
  return val
}

export class TextField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
    }
    this.onChange = this.onChange.bind(this)
    this.emitChange = this.emitChange.bind(this)
  }

  componentDidMount() {
    this.bindOnChangeEvent()
  }

  componentDidUpdate() {
    this.bindOnChangeEvent()
  }

  bindOnChangeEvent() {
    const input = this.refs.input
    input.removeEventListener('change', this.emitChange)
    input.addEventListener('change', this.emitChange)
  }

  componentWillReceiveProps(props) {
    const hasFocus = document.activeElement === this.refs.input
    if (this.state.value !== props.value && !hasFocus) {
      this.setState({
        value: props.value,
      })
    }
  }

  onChange(e) {
    const value = e.target.value
    this.setState({
      value,
    })
    if (this.props.onInput) {
      this.props.onInput(value)
    }
  }

  emitChange(e) {
    const value = sanitizeValue(this.props.type, e.target.value)
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    const {
      type = 'text',
      label = '',
      id = '',
      errors = [],
      placeholder = '',
      className = '',
      onfocus = (value) => value,
      help = '',
      disabled = false,
      autoFocus = false,
      min,
      max,
    } = this.props
    return (
      <div className={className}>
        <p>
          {label}
        </p>
        <input
          ref='input'
          className={`
            
          `}
          autoFocus={autoFocus}
          type={type}
          placeholder={placeholder}
          value={this.state.value}
          id={id}
          onFocus={onfocus}
          onChange={this.onChange}
          onBlur={(e) => {
            if (this.props.onblur) {
              this.props.onblur(e.target.value)
            }
          }}
          disabled={disabled}
          min={min}
          max={max}
        />
        {help && !errors.length
          ? (
            <p>{help}</p>
          ) : null
        }
        {errors.map((error, index) => {
          return (
            <p key={index}>
              {error}
            </p>
          )
        })}
      </div>
    )
  }
}

export default function (props) {
  return <TextField {...props} />
}
