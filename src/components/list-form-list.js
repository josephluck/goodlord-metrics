import * as React from 'react'
import Link from './link'
import Collapse from 'react-collapse'

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
        const isEditing = currentlyEditing === index
        return (
          <li
            key={index}
            id={`${id}-${index}`}
            className={`
              bra1 ba bcLightGray bgLight ph3 pv3 mb3 transition-bezier
              ${isEditing ? 'o50' : 'o100'}
            `}
          >
            <Collapse isOpened={!isEditing}>
              <div className='tr'>
                <Link
                  onClick={() => onEdit(index)}
                  className='mr2 fsSmall'
                >
                  Edit
                </Link>
                <Link
                  onClick={() => onRemove(index)}
                  className='fsSmall'
                >
                  Remove
                </Link>
              </div>
            </Collapse>
            {item(itm, index)}
          </li>
        )
      })}
    </ul>
  ) : null
}
