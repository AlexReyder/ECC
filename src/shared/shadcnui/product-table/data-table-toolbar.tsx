"use client"
import { productTableColumns } from '@/shared/constants/admin-tables'
import { Button } from "@/shared/shadcnui/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/shared/shadcnui/ui/command"
import { Input } from '@/shared/shadcnui/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/shadcnui/ui/popover"
import { cn } from '@/shared/utils'
import { Table } from '@tanstack/react-table'
import { Check, ChevronsUpDown } from 'lucide-react'
import { ChangeEvent, useState } from 'react'


interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
	const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [value, setValue] = useState(productTableColumns[0].column)
  // (event) => table.getColumn(value)?.setFilterValue(event.target.value)
  const filterItems = (event:ChangeEvent<HTMLInputElement>) =>{
    setInputValue(event.target.value)
    table.getColumn(value)?.setFilterValue(event.target.value)
  }

  return (
    <div className='flex items-center gap-x-4'>
      <div className='flex flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Поиск'
          value={inputValue}
          onChange={filterItems}
          className='h-8 w-[200px] lg:w-[250px]'
        />
      </div>
			<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] lg:w-[250px] h-8 justify-between"
        >
          {value
            ? productTableColumns.find((framework) => framework.column === value)?.label
            : "Выбрать фильтр"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>Не выбрано.</CommandEmpty>
            <CommandGroup>
              {productTableColumns.map((framework) => (
                <CommandItem
                  key={framework.column}
                  value={framework.column}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.column ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      </Popover>
    </div>
  )
}