import * as React from 'react'

export default function button({
  className,
  onClick,
  children,
  type = 'button',
}) {
  return (
    <button
      type={type}
      className='fwMedium bgBlue bgDarkBlue--hover fLight bra1 transition-quick pv2 ph3 c-pointer tt-uppercase'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
