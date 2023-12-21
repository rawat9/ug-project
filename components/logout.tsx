'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { signOut } from '@/lib/actions'
import { useRouter } from 'next/navigation'

export function Logout() {
  const router = useRouter()

  async function handleLogout() {
    const { error } = await signOut()

    if (error) {
      console.error(error)
    }

    router.push('/auth/login')
  }

  return <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
}
