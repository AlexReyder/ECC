"use client"
import { Button } from '@/shared/shadcnui/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { FilterType, useFilter } from '../context/filters-context'

export function FiltersPrimaryButtons({specType}:{specType:FilterType}) {
  const { setOpen } = useFilter()
  const specNames = {
    band: 'новую группу',
    genre: 'новый муз.стиль',
    colors: 'новый цвет',
    sizes: 'новый размер',
    manufacturer: 'нового производителя',
  }
  return (
    <>
    {
      specType && (
        <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
            <span>Добавить {specNames[specType]}</span> <IconPlus size={18} />
            </Button>
        </div>
      )
    }
    </>
  )
}