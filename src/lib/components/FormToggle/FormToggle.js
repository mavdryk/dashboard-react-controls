import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import './formToggle.scss'

const FormToggle = ({ className, label, name, onChange, readOnly, ...inputProps }) => {
  return (
    <Field name={name} value={inputProps.value} type="checkbox">
      {({ input }) => {
        const toggleClassName = classnames(
          'form-field-toggle',
          className,
          readOnly && 'form-field-toggle_readonly',
          input.checked && 'form-field-toggle_checked'
        )

        return (
          <label className={toggleClassName}>
            <input
              data-testid="toggle"
              id={name}
              {...{ ...input, ...inputProps }}
              onChange={(event) => {
                onChange && onChange(event)
                input.onChange(event)
              }}
              type="checkbox"
            />
            <div className="form-field-toggle__switch">
              <span className="form-field-toggle__switch-button" />
            </div>
            {label && <div className="form-field-toggle__label">{label}</div>}
          </label>
        )
      }}
    </Field>
  )
}

FormToggle.defaultProps = {
  className: '',
  label: '',
  onChange: () => {},
  readOnly: false
}

FormToggle.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool
}

export default FormToggle
