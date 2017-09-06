import * as React from 'react'

export default function listFormList({
  editText,
  deleteText,
  className = '',
  items,
  item,
  currentlyEditing,
  onEdit,
  onRemove,
  id = '',
}) {
  return items.length ? (
    <ul className={className}>
      {items.map((itm, index) => {
        return (
          <li
            key={index}
            id={`${id}-${index}`}
          >
            {item(itm, index)}
            <p className='tc'>
              <a onClick={() => onEdit(index)}>Edit</a>
            </p>
            <p className='tc'>
              <a onClick={() => onRemove(index)}>Remove</a>
            </p>
          </li>
        )
      })}
    </ul>
  ) : null
}
