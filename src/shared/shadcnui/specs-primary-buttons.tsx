"use client"
import { Button } from '@/shared/shadcnui/ui/button'
import { IconPlus } from '@tabler/icons-react'
import {useSpecification } from '../context/specifications-context'

export function SpecsPrimaryButtons({specType}:{specType:SpecificationType}) {
  const { setOpen } = useSpecification()
  return (
    <>
    {
		(
        <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
            <span>Добавить категорию</span> <IconPlus size={18} />
            </Button>
        </div>
      )
    }
    </>
  )
}
