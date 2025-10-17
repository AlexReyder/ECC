"use client"
import { useUsers } from '@/shared/context/users-context'

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()
  return (
    <>
    </>
  )
}
