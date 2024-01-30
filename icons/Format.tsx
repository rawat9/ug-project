import { ComponentProps } from 'react'

export function Format(props: ComponentProps<'svg'>) {
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
        d="M3 21v-1h17v1zm8-4v-1h9v1zm0-4v-1h9v1zm0-4V8h9v1zM3 5V4h17v1zm5.5 7.5L3 18V7zm-1.41 0L4 9.41v6.18z"
      />
    </svg>
  )
}
