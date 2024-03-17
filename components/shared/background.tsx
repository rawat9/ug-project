export function DotBackgroundDemo({children}: {children: React.ReactNode}) {
  return (
    <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] h- relative flex h-screen w-full items-center justify-center dark:bg-black">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] dark:bg-black"></div>
      {children}
    </div>
  )
}
