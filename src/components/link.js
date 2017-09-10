import * as React from 'react'

export default function link({
  className,
  onClick,
  href,
  children,
}) {
  return (
    <a
      className={`d-ib fwBold fBlue fDarkBlue--hover transition-quick c-pointer tt-uppercase ${className}`}
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
