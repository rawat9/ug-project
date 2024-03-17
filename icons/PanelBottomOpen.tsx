import type { SVGProps } from 'react'

export function PanelBottomOpen(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <rect width={18} height={18} x={3} y={3} rx={2}></rect>
        <path d="M3 15h18M9 10l3-3l3 3"></path>
      </g>
    </svg>
  )
}
