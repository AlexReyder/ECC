"use client"
import {  useSpecification } from '@/shared/context/specifications-context'
import { useEffect } from 'react'
import { SpecActionDialog } from './specification-action-dialog'
import { SpecDeleteDialog } from './specification-delete-dialog'

export function SpecificationDialogs() {
  const { open, setOpen, currentRow, setCurrentRow} = useSpecification()
  return (
    <>
    {(
     <SpecActionDialog
     key='spec-add'
     
     open={open === 'add'}
     onOpenChange={() => setOpen('add')}
  />
    )}
    
          
      {currentRow && (
        <>
         <SpecActionDialog
            key={`spec-edit-${currentRow.id}`}
            
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <SpecDeleteDialog
            key={`spec-delete-${currentRow.id}`}
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
