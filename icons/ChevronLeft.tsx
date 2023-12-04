import { ComponentProps } from 'react'

export function ChevronLeft(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.842 3.135a.5.5 0 0 1 .023.707L5.435 7.5l3.43 3.658a.5.5 0 0 1-.73.684l-3.75-4a.5.5 0 0 1 0-.684l3.75-4a.5.5 0 0 1 .707-.023Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
