import type { SVGProps } from 'react'

export function CodeEditor(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="currentColor">
        <path d="m5.033 14.828l1.415 1.415L10.69 12L6.448 7.757L5.033 9.172L7.862 12zM15 14h-4v2h4z"></path>
        <path
          fillRule="evenodd"
          d="M2 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm20 2H2v16h20z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  )
}
