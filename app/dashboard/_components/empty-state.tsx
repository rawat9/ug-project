import Image from 'next/image'
import { CreateFormDialog } from './create-form-dialog'

export function EmptyState() {
  return (
    <div className="flex min-h-[inherit] flex-col items-center justify-center">
      <Image
        src="/empty-dashboard.svg"
        alt="Empty dashboard"
        width={400}
        height={300}
        priority
      />
      <h1 className="mb-2 text-2xl font-semibold">
        Start building your dashboard!
      </h1>
      <h4 className={'mb-3 text-center text-sm text-gray-500'}>
        <p>Every dashboard you create will appear here.</p>
        To get started, click the button below
      </h4>
      <CreateFormDialog
        props={{ variant: 'ghost', 'aria-label': 'Create a new dashboard' }}
      />
    </div>
  )
}
