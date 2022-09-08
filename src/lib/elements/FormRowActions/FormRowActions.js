import React from 'react'
import PropTypes from 'prop-types'

import { RoundedIcon } from '../../components'

import { FORM_TABLE_EDITING_ITEM } from '../../types'

import { ReactComponent as Close } from '../../images/close.svg'
import { ReactComponent as Edit } from '../../images/edit.svg'
import { ReactComponent as Delete } from '../../images/delete.svg'
import { ReactComponent as Checkmark } from '../../images/checkmark2.svg'

const FormRowActions = ({
  applyChanges,
  deleteRow,
  discardOrDelete,
  editingItem,
  fieldsPath,
  index
}) => {
  return (
    <>
      {editingItem?.ui?.index === index ? (
        <div className="form-table__cell form-table__actions-cell">
          <RoundedIcon onClick={(event) => applyChanges(event, index)} tooltipText="Apply">
            <Checkmark />
          </RoundedIcon>
          <RoundedIcon
            onClick={(event) => discardOrDelete(event, fieldsPath, index)}
            tooltipText={editingItem.ui?.isNew ? 'Delete' : 'Discard changes'}
          >
            {editingItem.ui?.isNew ? <Delete /> : <Close />}
          </RoundedIcon>
        </div>
      ) : (
        <div className="form-table__cell form-table__actions-cell">
          <RoundedIcon
            onClick={(event) => {
              event.preventDefault()
            }}
            tooltipText="Edit"
          >
            <Edit />
          </RoundedIcon>

          <RoundedIcon
            onClick={(event) => {
              deleteRow(event, fieldsPath, index)
            }}
            tooltipText="Delete"
          >
            <Delete />
          </RoundedIcon>
        </div>
      )}
    </>
  )
}

FormRowActions.defaultProps = {
  editingItem: null
}

FormRowActions.propTypes = {
  applyChanges: PropTypes.func.isRequired,
  deleteRow: PropTypes.func.isRequired,
  discardOrDelete: PropTypes.func.isRequired,
  editingItem: FORM_TABLE_EDITING_ITEM,
  fieldsPath: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default FormRowActions
