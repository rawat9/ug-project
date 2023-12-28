import { ComponentProps } from 'react'

export function Button(props: ComponentProps<'svg'>) {
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
        d="M18.1 15.3c-.1.1-.3.2-.4.3l-2.4.4l1.7 3.6c.2.4 0 .8-.4 1l-2.8 1.3c-.1.1-.2.1-.3.1c-.3 0-.6-.2-.7-.4L11.2 18l-1.9 1.5c-.1.1-.3.2-.5.2c-.4 0-.8-.3-.8-.8V7.5c0-.5.3-.8.8-.8c.2 0 .4.1.5.2l8.7 7.4c.3.2.4.7.1 1M6 12H4V4h16v8h-1.6l2.2 1.9c.8-.3 1.3-1 1.3-1.9V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h2z"
      />
    </svg>
  )
}
