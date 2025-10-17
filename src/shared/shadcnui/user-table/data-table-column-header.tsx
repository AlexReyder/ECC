"use client"
import { Button } from '@/shared/shadcnui/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/shadcnui/ui/dropdown-menu'
import { userTypes } from '@/shared/types/user'
import { cn } from '@/shared/utils'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  ChevronDownIcon,
  TrashIcon
} from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'
import { Separator } from '../ui/separator'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

}
