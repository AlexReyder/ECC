"use client"
import { useUsers } from '@/shared/context/users-context'
import { Button } from '@/shared/shadcnui/ui/button'
import { IconUserPlus } from '@tabler/icons-react'

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers()
  return (
    <div className='flex gap-2'>
    </div>
  )
}
