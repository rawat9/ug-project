import type { SVGProps } from 'react'

export function AlignCenter(props: SVGProps<SVGSVGElement>) {
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
        d="M12 4v16m4-8h5m-3-3l-3 3l3 3M8 12H3m3-3l3 3l-3 3"
      />
    </svg>
  )
}
