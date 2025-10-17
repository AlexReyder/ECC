"use client"
import { Button } from '@/shared/shadcnui/ui/button'
import { IconUserPlus } from '@tabler/icons-react'
import { useProduct } from '../context/products-context'

export function ProductPrimaryButtons() {
  const { setOpen } = useProduct()
  return (

        <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
            <span>Добавить новый товар</span> <IconUserPlus size={18} />
            </Button>
        </div>
  )
}