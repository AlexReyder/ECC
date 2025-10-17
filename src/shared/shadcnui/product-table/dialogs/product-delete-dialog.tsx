'use client'

import { removeProduct } from '@/shared/api/admin/products'
import { ConfirmDialog } from '@/shared/shadcnui/confirm-dialog'
import { ProductsDb } from '@/shared/types/validation/products'
import { IconAlertTriangle } from '@tabler/icons-react'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: ProductsDb
}

export function ProductDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const handleDelete = async () => {
		const {success, error} = await removeProduct(currentRow.id)
          if(success){
              toast.success('Товар успешно удален')
            }
          
          if(error){
              toast.error('Произошла ошибка')
              console.log(error)
            }
    onOpenChange(false)
  }

  return (
    <>
      <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='mr-1 inline-block stroke-destructive'
            size={18}
          />{' '}
         Удалить пользователя
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Вы уверены что хотите удалить
            <span className='font-bold'> {currentRow.name}</span>?
            <br />
						Это перманентно удалит пользователя с базы данных.
          </p>
        </div>
      }
      confirmText='Удалить'
      cancelBtnText='Отмена'
      destructive
    />
     <Toaster
              position="bottom-right"
              reverseOrder={false}
              toastOptions={{duration:3000}}
            />
    </>
  
  )
}