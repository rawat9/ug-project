import type { SVGProps } from 'react'

export function AlignBottom(props: SVGProps<SVGSVGElement>) {
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
        d="M20 20H4m8-3V6m0 11l3-3m-3 3l-3-3"
      />
    </svg>
  )
}
