import React from 'react'

import { ReactComponent as Plus } from '../../images/plus.svg'
import PropTypes from 'prop-types'

const FormActionButton = ({ disabled, fields, fieldsPath, label, onClick }) => {
  return (
    <div className="form-table__row form-table__action-row no-hover">
      <button
        onClick={(event) => {
          !disabled && onClick(event, fields, fieldsPath)
        }}
      >
        <Plus />
        {label}
      </button>
    </div>
  )
}

FormActionButton.defaultProps = {
  disabled: false,
  label: 'Add new item'
}

FormActionButton.propTypes = {
  disabled: PropTypes.bool,
  fields: PropTypes.shape({}).isRequired,
  fieldsPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default FormActionButton
