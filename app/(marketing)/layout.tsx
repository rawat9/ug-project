import { GridBackground } from './_components/GridBackground'
import { Header } from './_components/Header'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <GridBackground>{children}</GridBackground>
    </div>
  )
}
