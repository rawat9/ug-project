import { Button, Chart, Table, Text } from '@/icons'

// className="h-8 w-8 duration-500 ease-in-out hover:scale-150"
const elements = [
  {
    name: 'text',
    icon: <Text />,
  },
  {
    name: 'button',
    icon: <Button />,
  },
  {
    name: 'chart',
    icon: <Chart />,
  },
  {
    name: 'table',
    icon: <Table />,
  },
] as const

function Element({ icon, name }: { icon: React.ReactElement; name: string }) {
  return (
    <div className="flex min-h-[120px] w-full cursor-grab select-none flex-col items-center justify-center gap-4 rounded-lg border hover:bg-gray-100">
      {icon}
      <p className="text-sm font-medium capitalize text-slate-900">{name}</p>
    </div>
  )
}

export function Widgets() {
  return (
    <div className="h-full w-full overflow-auto rounded-lg bg-white p-2">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-2">
        {elements.map((element) => (
          <Element key={element.name} {...element} />
        ))}
      </div>
    </div>
  )
}
