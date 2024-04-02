'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import lodashLast from 'lodash/last'

export function Preview() {
  const params = useParams()
  const pathname = usePathname()
  const isPreviewMode = lodashLast(pathname.split('/')) === 'preview'

  return (
    <Link
      href={`/dashboard/${params.slug}/${isPreviewMode ? 'edit' : 'preview'}`}
      aria-label="Preview the dashboard"
      scroll={false}
      className="flex h-8 items-center rounded-md border p-2 hover:bg-gray-100"
    >
      <p className="text-sm">{isPreviewMode ? 'Edit' : 'Preview'}</p>
    </Link>
  )
}
