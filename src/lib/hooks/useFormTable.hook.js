import { useEffect, useRef, useState } from 'react'
import { get, omit } from 'lodash'

export const useFormTable = (formState) => {
  // `editingItem` should contain the `data` object with all fields that are used in the `formState`.
  // Properties that aren't used in the `formState` should be placed directly in the `editingItem` object
  // `editingItem` also has an `ui` property which is used internally in this hook
  //
  // e.g.
  // editingItem = {
  //   data: {
  //     <fieldName>: <fieldValue>,
  //     <fieldName2>: <fieldValue2>
  //   },
  //   <anotherProperty>: <anotherPropertyValue>
  //   ui: {
  //     isNew: true, // `true` if we are creating a new row, if we are editing it's `false
  //     fieldsPath, // the path where table data is placed in the `formState`
  //     index: fields.value.length // index of the editing row
  //   }
  // }
  const [editingItem, setEditingItem] = useState(null)
  const editingItemRef = useRef(null)

  useEffect(() => {
    editingItemRef.current = editingItem
  }, [editingItem])

  useEffect(() => {
    return () => {
      if (editingItemRef.current?.ui?.isNew) {
        formState.form.mutators.remove(
          editingItemRef.current.ui.fieldsPath,
          editingItemRef.current.ui.index
        )
      } else if (editingItemRef.current) {
        formState.form.mutators.update(
          editingItemRef.current.ui.fieldsPath,
          editingItemRef.current.ui.index,
          omit(editingItemRef.current, ['ui'])
        )
      }
    }
  }, [formState.form.mutators])

  const addNewRow = (event, fields, fieldsPath, newItem) => {
    applyOrDiscardOrDelete(event)
    formState.form.mutators.push(fieldsPath, newItem)
    setEditingItem(() => {
      return {
        ...newItem,
        ui: {
          isNew: true,
          fieldsPath,
          index: fields.value?.length || 0
        }
      }
    })
  }

  const applyChanges = (event, index) => {
    if (editingItem) {
      if (!get(formState?.errors, editingItem.ui.fieldsPath.split('.'), false)) {
        exitEditMode()
      } else {
        const errorField = get(formState.errors, editingItem.ui.fieldsPath.split('.'), {})[index]

        // Mark all empty fields as `modified` in order to highlight the error if the field is invalid
        Object.entries(errorField.data).forEach(([fieldName]) => {
          formState.form.mutators.setFieldState(
            `${editingItem.ui.fieldsPath}[${index}].data.${fieldName}`,
            {
              modified: true
            }
          )
        })
      }
    }
  }

  const applyOrDiscardOrDelete = (event = null) => {
    if (editingItem) {
      if (!get(formState?.errors, editingItem.ui.fieldsPath, false)) {
        applyChanges(event, editingItem.ui.index)
      } else {
        discardOrDelete(event, editingItem.ui.fieldsPath, editingItem.ui.index)
      }
    }
  }

  const deleteRow = (event, fieldsPath, index) => {
    if (editingItem && index !== editingItem.ui.index) {
      applyOrDiscardOrDelete(event)
    }

    exitEditMode()

    formState.form.mutators.remove(fieldsPath, index)
    event && event.stopPropagation()
  }

  const discardChanges = (event, fieldsPath, index) => {
    exitEditMode()
    formState.form.mutators.update(fieldsPath, index, omit(editingItem, ['ui']))
    event && event.stopPropagation()
  }

  const discardOrDelete = (event, fieldsPath, index) => {
    if (!editingItem || editingItem?.ui?.isNew) {
      deleteRow(event, fieldsPath, index)
    } else {
      discardChanges(event, fieldsPath, index)
    }
  }

  const enterEditMode = (event, fields, fieldsPath, index) => {
    applyOrDiscardOrDelete(event)

    const editItem = fields.value[index]

    setEditingItem(() => {
      return { ...editItem, ui: { fieldsPath, index } }
    })
  }

  const exitEditMode = () => {
    setEditingItem(null)
  }

  return {
    addNewRow,
    applyChanges,
    applyOrDiscardOrDelete,
    deleteRow,
    discardChanges,
    discardOrDelete,
    editingItem,
    editingItemRef,
    enterEditMode,
    exitEditMode
  }
}
