"use client"
import useDialogState from '@/shared/hooks/use-dialog-state'
import { FilterAdmin } from '@/shared/types/schemas'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

type FiltersDialogType = 'add' | 'edit' |'delete' 
export type FilterType = 'material'| 'colors' | 'sizes'

interface FiltersContextType {
	open: FiltersDialogType | null
	specType: FilterType | null
	setOpen: (str: FiltersDialogType | null) => void
	setSpecType: (str: FilterType | null) => void
	currentRow: FilterAdmin | null
	setCurrentRow: Dispatch<SetStateAction<FilterAdmin | null>>
	data?: any
	setData?: any
}

const FiltersContext = createContext<FiltersContextType | null>(null)

interface Props {
	children: ReactNode
}

export default function FiltersProvider({ children }: Props) {
	const [open, setOpen] = useDialogState<FiltersDialogType>(null)
	const [specType, setSpecType] = useState<FilterType | null>(null)
	const [data, setData] = useState<any>(null)
	const [currentRow, setCurrentRow] = useState<FilterAdmin | null>(null);

	return(
		<FiltersContext value={{ open, setOpen, specType, setSpecType, currentRow, setCurrentRow, data, setData }}>
		{children}
	</FiltersContext>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = () => {
	const filtersContext = React.useContext(FiltersContext)

	if (!filtersContext) {
		throw new Error('useFilter has to be used within <FiltersContext>')
	}

	return filtersContext
}
