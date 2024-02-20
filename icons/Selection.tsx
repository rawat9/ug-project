import type { SVGProps } from 'react'

export function Selection(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          d="M14 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10"
        ></path>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2 7h20M5 5.01l.01-.011M8 5.01l.01-.011M11 5.01l.01-.011"
        ></path>
        <path
          d="M22.082 18.365c.494.304.464 1.043-.045 1.1l-2.566.292l-1.152 2.312c-.228.458-.933.234-1.05-.334l-1.255-6.116c-.098-.48.333-.782.75-.525z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  )
}
