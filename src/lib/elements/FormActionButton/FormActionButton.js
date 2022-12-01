import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as Plus } from '../../images/plus.svg'

const FormActionButton = React.forwardRef(
  ({ disabled, fields, fieldsPath, hidden, label, onClick }, ref) => {
    return (
      <>
        {!hidden && (
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
        )}
        {/*The tag `span` below is used as bottom point to scroll to if the new item is added to the list*/}
        <span ref={ref}></span>
      </>
    )
  }
)

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
