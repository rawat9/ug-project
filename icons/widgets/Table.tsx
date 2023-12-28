import { ComponentProps } from 'react'

export function Table(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4 8.5V5.615q0-.666.475-1.14Q4.949 4 5.615 4h13.77q.666 0 1.14.475q.475.474.475 1.14V8.5zm4.385 1V20h-2.77q-.666 0-1.14-.475Q4 19.051 4 18.385V9.5zm8.23 0H21v8.885q0 .666-.475 1.14q-.474.475-1.14.475h-2.77zm-1 0V20h-6.23V9.5z"
      />
    </svg>
  )
}
