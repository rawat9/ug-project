import type { SVGProps } from 'react'

export function AlignMiddle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 12h16m-8-4V3M9 6l3 3l3-3m-3 10v5m-3-3l3-3l3 3"
      />
    </svg>
  )
}
