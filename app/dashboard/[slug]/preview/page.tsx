import { Canvas } from '../_components/canvas'

export default function Page() {
  return (
    <div className="fixed top-14 h-[calc(100vh_-_3.5rem)] w-full">
      <Canvas isPreview={true} />
    </div>
  )
}
