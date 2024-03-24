import type { SVGProps } from 'react'

export function DragHandle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M5.5 14.5q-.213 0-.356-.144Q5 14.212 5 14t.144-.356q.144-.143.356-.143h13q.213 0 .356.144q.144.144.144.357t-.144.356q-.143.143-.356.143zm0-4q-.213 0-.356-.144Q5 10.212 5 10t.144-.356Q5.288 9.5 5.5 9.5h13q.213 0 .356.144Q19 9.788 19 10t-.144.356q-.143.143-.356.143z"
      ></path>
    </svg>
  )
}
