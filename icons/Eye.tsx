import type { SVGProps } from 'react'

export function Eye(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M12 5C7.336 5 3.6 7.903 2 12c1.6 4.097 5.336 7 10 7s8.4-2.903 10-7c-1.6-4.097-5.336-7-10-7m0 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
          clipRule="evenodd"
          opacity={0.16}
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7"
        ></path>
      </g>
    </svg>
  )
}
