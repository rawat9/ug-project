import type { SVGProps } from 'react'

export function BarChart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M32 32v432a16 16 0 0 0 16 16h432"
      ></path>
      <rect
        width={80}
        height={192}
        x={96}
        y={224}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={20}
        ry={20}
      ></rect>
      <rect
        width={80}
        height={240}
        x={240}
        y={176}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={20}
        ry={20}
      ></rect>
      <rect
        width={80}
        height={304}
        x={383.64}
        y={112}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={20}
        ry={20}
      ></rect>
    </svg>
  )
}
