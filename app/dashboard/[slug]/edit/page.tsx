import { Editor } from '../_components/editor'
import { Canvas } from '../_components/canvas'
import { Widgets } from '../_components/widgets'
import { Properties } from '../_components/properties'
import { State } from '../_components/state'
import { Sidebar } from '../_components/sidebar'

export default function Page({
  searchParams,
}: {
  searchParams?: {
    editor?: string
    widgets?: string
    state?: string
  }
}) {
  return (
    <>
      <Sidebar />
      <div className="fixed left-12 top-14 z-10 h-[calc(100vh_-_3.5rem)] w-[calc(100vw_-_3rem)]">
        <State isOpen={searchParams?.state === 'true'} />
        <Widgets isOpen={searchParams?.widgets === 'true'} />
        <Canvas />
        <Editor isOpen={searchParams?.editor === 'true'} />
        <Properties />
      </div>
    </>
  )
}
