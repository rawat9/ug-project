import type { SVGProps } from 'react'

export function LineChart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72l212-211.999V280h32V160z"
      ></path>
      <path fill="currentColor" d="M48 104H16v392h480v-32H48z"></path>
    </svg>
  )
}
