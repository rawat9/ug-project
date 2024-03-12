import type { SVGProps } from 'react'

export function Component(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.303.04a.5.5 0 0 1 .394 0L14.5 2.956l-7 3l-7-3zM0 3.83v7.67c0 .2.12.38.303.46L7 14.83v-8zm8 3l7-3v7.67a.5.5 0 0 1-.303.46L8 14.83z"
      ></path>
    </svg>
  )
}
