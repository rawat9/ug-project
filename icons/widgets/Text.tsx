import { ComponentProps } from 'react'

export function Text(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 7V5h13v2m-6-2v14m2 0H8m7-6v-1h6v1m-3-1v7m-1 0h2"
      />
    </svg>
  )
}
