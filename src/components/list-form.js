import * as React from 'react'

export default function listForm({
  saveText,
  saveChangesText,
  addText,
  addAnotherText,
  formVisible,
  currentlyEditing,
  numberOfItems,
  form,
  list,
  onSave,
  onDiscardEdit,
  onToggleVisibility,
  autoShowForm = true,
}) {
  const isEditing = currentlyEditing !== null
  const formShowing = (numberOfItems === 0 && autoShowForm) || isEditing || formVisible
  const showCancelLink = (numberOfItems > 0 || !autoShowForm) && formShowing
  return (
    <div>
      {list}

      {formShowing
        ? (
          <div>
            {form}

            <p className='tc'>
              <a onClick={onSave}>
                {isEditing ? saveChangesText : saveText}
              </a>
            </p>

            {isEditing
              ? (
                <p className='tc'>
                  <a onClick={onDiscardEdit}>
                    Discard Changes
                  </a>
                </p>
              )
              : showCancelLink ? (
                <p className='tc'>
                  <a onClick={() => onToggleVisibility(false)}>Cancel</a>
                </p>
              ) : null
            }
          </div>
        )
        : (
          <p className='tc'>
            <a onClick={() => onToggleVisibility(true)}>
              {numberOfItems > 0 ? addAnotherText : addText}
            </a>
          </p>
        )
      }
    </div>
  )
}
