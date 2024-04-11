export function GridBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full bg-white bg-grid-small-black/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="">{children}</div>
    </div>
  )
}
