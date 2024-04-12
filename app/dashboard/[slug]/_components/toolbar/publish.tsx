'use client'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, Copy, Publish as PublishIcon, Selection } from '@/icons'
import { publishDashboard, unPublishDashboard } from '@/lib/data/server/dashboard'
import toast from 'react-hot-toast'
import { useOrigin } from '@/hooks/useOrigin'
import { useState } from 'react'

export function Publish({
  id,
  isDashboardPublished,
}: {
  id: string
  isDashboardPublished: boolean
}) {
  const [copied, setCopied] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isPublished, setIsPublished] = useState(isDashboardPublished)
  const origin = useOrigin()
  const url = `${origin}/dashboard/${id}/preview`

  function onCopy() {
    navigator.clipboard.writeText(url)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  function publish() {
    setIsPublishing(true)
    const promise = publishDashboard(id)
    toast
      .promise(
        promise,
        {
          loading: 'Publishing...',
          success: () => {
            setIsPublished(true)
            return 'Published!'
          },
          error: 'Failed to publish dashboard',
        },
        {
          position: 'top-center',
        },
      )
      .finally(() => {
        setIsPublishing(false)
      })
  }

  function unpublish() {
    setIsPublishing(true)
    const promise = unPublishDashboard(id)
    toast
      .promise(
        promise,
        {
          loading: 'Unpublishing...',
          success: () => {
            setIsPublished(false)
            return 'Unpublished!'
          },
          error: 'Failed to unpublish dashboard',
        },
        {
          position: 'top-center',
        },
      )
      .finally(() => {
        setIsPublishing(false)
      })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-8">Publish</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end" forceMount>
        {isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
              </span>
              <p className="text-xs font-medium text-sky-500">
                This dashboard is live on web.
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="h-8 flex-1 rounded-l-md border px-2 text-xs"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="w-full text-xs"
                variant="outline"
                onClick={unpublish}
              >
                Unpublish
              </Button>
              <a
                href={url}
                className="flex w-full items-center justify-center rounded-md bg-blue-500 p-2 text-xs text-white hover:bg-blue-600"
                target="blank"
                rel="noreferrer"
              >
                <PublishIcon className="mr-1 h-4 w-4" />
                View site
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Selection className="mb-2 h-8 w-8 text-gray-400" />
            <p className="mb-1 font-medium">Publish this dashboard</p>
            <span className="mb-8 text-xs text-gray-500">
              Share your work with others.
            </span>
            <Button
              disabled={isPublishing}
              onClick={publish}
              className="w-full text-xs"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
