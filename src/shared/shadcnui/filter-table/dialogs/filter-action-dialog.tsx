'use client'

import { upsertFilter } from '@/shared/api/admin/filters'
import { uniqueProductBand } from '@/shared/api/admin/formUnique'
import { getAllSpecifications } from '@/shared/api/admin/specifications'
import { FilterType } from '@/shared/context/filters-context'
import { Button } from '@/shared/shadcnui/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/shared/shadcnui/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/shadcnui/ui/form'
import { Input } from '@/shared/shadcnui/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcnui/ui/select"
import { FilterAdmin } from '@/shared/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'


const specNames = {
  material: 'новый материал',
  colors: 'новый цвет',
  sizes: 'новый размер',
}
const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Обязательное поле.' }),
  })

export type FilterAdminForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: FilterAdmin
  specType: FilterType | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FilterActionDialog({ currentRow, specType, open, onOpenChange }: Props) {
  const [err, setErr] = useState('')
  const isEdit = !!currentRow
  const form = useForm<FilterAdminForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
					name: currentRow.name,
        }
      : {
          name: '',
        },
  })
  const onSubmit = async (values: FilterAdminForm) => {
	  if(specType){
      values.id = isEdit ? currentRow.id : ''
      const {success, error} = await upsertFilter(values, specType)
      form.reset()
      
      const toastMessage = isEdit ? 'Фильтр успешно изменен' : 'Фильтр успешно добавлен'
      if(success){
        toast.success(toastMessage)
      }

      if(error){
        toast.error('Произошла ошибка')
      }

      onOpenChange(false)
    }
  }

  return (
    <>
    {specType && (
        <Dialog
        open={open}
        onOpenChange={(state) => {
          form.reset()
          onOpenChange(state)
        }}
      >
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader className='text-left'>
            <DialogTitle>{specType ? isEdit? `Изменить ${specNames[specType]}` : `Добавить ${specNames[specType]}` : ''}</DialogTitle>
          </DialogHeader>
          <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
            <Form {...form}>
              <form
                id='filter-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 p-0.5'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-right'>
                       Название
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=''
                          className='col-span-4'
                          autoComplete='off'
                          {...field}
                        />
                      </FormControl>
                      {err ? (
                          <p className='text-red-600 col-span-6 text-sm'>{err}</p>
                      ): null}
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
              </form>
  
            </Form>
          </div>
          <DialogFooter>
            <Button type='submit' form='filter-form'>
             Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )}
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{duration:3000}}
    />
    </>
  )
}
