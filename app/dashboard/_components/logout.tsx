'use client'

import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import { Logout as LogoutIcon } from '@/icons'

export function Logout() {
  const router = useRouter()

  async function handleLogout() {
    await signOut()
    router.push('/auth/login')
  }

  return (
    <Button
      className="w-full"
      data-testid="logout-button"
      onClick={handleLogout}
    >
      Log out
      <LogoutIcon className="ml-1 h-4 w-4" />
    </Button>
  )
}
