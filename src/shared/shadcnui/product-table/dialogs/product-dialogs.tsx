"use client"
import { useProduct } from '@/shared/context/products-context'
import { use } from 'react'
import { ProductActionDialog } from './product-action-dialog'
import { ProductDeleteDialog } from './product-delete-dialog'

export function ProductsDialogs({data}: {data: Promise<any>}) {
  const availableData = use(data)
  const { open, setOpen, currentRow, setCurrentRow } = useProduct()
  return (
    <>
    <ProductActionDialog
             key='products-add'
             open={open === 'add'}
             onOpenChange={() => setOpen('add')}
             data={availableData}
          />

      {currentRow && (
        <>
         <ProductActionDialog
            key={`products-action-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
            data={availableData}
          />

          <ProductDeleteDialog
           key={`products-delete-${currentRow.id}`}
           open={open === 'delete'}
           onOpenChange={() => {
             setOpen('delete')
             setTimeout(() => {
               setCurrentRow(null)
             }, 500)
           }}
           currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}