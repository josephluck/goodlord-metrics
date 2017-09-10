import * as React from 'react'
import Button from './button'
import Link from './link'
import Collapse from 'react-collapse'

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

      <div className={`pt3 transition-bezier ${formShowing ? 'o100' : 'o0'}`}>
        <Collapse isOpened={formShowing}>
          <form
            onSubmit={e => {
              e.preventDefault()
              onSave()
            }}
          >
            <div>
              {form}
            </div>
            <p className='tc mb2'>
              <Button type='submit'>
                {isEditing ? saveChangesText : saveText}
              </Button>
            </p>
          </form>

          {isEditing
            ? (
              <p className='tc'>
                <Link className='fsSmall' onClick={onDiscardEdit}>
                  Discard Changes
                </Link>
              </p>
            )
            : showCancelLink ? (
              <p className='tc'>
                <Link className='fsSmall' onClick={() => onToggleVisibility(false)}>Cancel</Link>
              </p>
            ) : null
          }
        </Collapse>
      </div>

      <div className={`transition-bezier ${!formShowing ? 'o100' : 'o0'}`}>
        <Collapse isOpened={!formShowing} className='tc'>
          <Button onClick={() => onToggleVisibility(true)}>
            {numberOfItems > 0 ? addAnotherText : addText}
          </Button>
        </Collapse>
      </div>
    </div>
  )
}
