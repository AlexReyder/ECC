'use client'

import { removeFilter } from '@/shared/api/admin/filters'
import { FilterType } from '@/shared/context/filters-context'
import { ConfirmDialog } from '@/shared/shadcnui/confirm-dialog'
import { FilterAdmin } from '@/shared/types/schemas'
import { IconAlertTriangle } from '@tabler/icons-react'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: FilterAdmin
  specType: FilterType | null
}

const specNames = {
  band: 'группу',
  genre: 'стиль',
  colors: 'цвет',
  sizes: 'размер',
  manufacturer: 'производителя',
}

export function FilterDeleteDialog({ open, specType, onOpenChange, currentRow }: Props) {
  const handleDelete = async () => {
		if(specType){
      const {success, error} = await removeFilter(currentRow.id, specType)
      if(success){
          toast.success('Фильтр успешно удален')
        }
      
      if(error){
          toast.error('Произошла ошибка')
        }
      onOpenChange(false)
    }
  }

  return (
   <>
   {
    specType &&  <ConfirmDialog
    open={open}
    onOpenChange={onOpenChange}
    handleConfirm={handleDelete}
    title={
      <span className='text-destructive'>
        <IconAlertTriangle
          className='mr-1 inline-block stroke-destructive'
          size={18}
        />{' '}
       Удалить {specNames[specType]}
      </span>
    }
    desc={
      <div className='space-y-4'>
        <p className='mb-2'>
          Вы уверены что хотите удалить
          <span className='font-bold'> {currentRow.name}</span>?
          <br />
          Это перманентно удалит информацию с базы данных.
        </p>
      </div>
    }
    confirmText='Удалить'
    cancelBtnText='Отмена'
    destructive
    />
   }
    <Toaster
         position="bottom-right"
         reverseOrder={false}
         toastOptions={{duration:3000}}
       />
   </>
  )
}