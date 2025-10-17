"use client"
import { FilterType, useFilter } from '@/shared/context/filters-context'
import { useEffect } from 'react'
import { FilterActionDialog } from './filter-action-dialog'
import { FilterDeleteDialog } from './filter-delete-dialog'

export function FilterDialogs({spec}:{spec: FilterType}) {
  const { open, setOpen, currentRow, setCurrentRow, specType, setSpecType } = useFilter()
  useEffect(()=>{
    setSpecType(spec)
  },[spec])

  return (
    <>
    {spec && (
     <FilterActionDialog
     key='filter-add'
     specType={specType}
     open={open === 'add'}
     onOpenChange={() => setOpen('add')}
  />
    )}
    
          
      {currentRow && (
        <>
         <FilterActionDialog
            key={`filter-edit-${currentRow.id}`}
            specType={specType}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <FilterDeleteDialog
            key={`filter-delete-${currentRow.id}`}
            specType={specType}
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