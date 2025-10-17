"use client"
import useDialogState from '@/shared/hooks/use-dialog-state'
import { ProductsDb } from '@/shared/types/validation/products'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

type ProductsDialogType = 'add' | 'edit' |'delete' 

interface FiltersContextType {
	open: ProductsDialogType | null
	data: any
	setOpen: (str: ProductsDialogType | null) => void
	setData: (str: any | null) => void
	currentRow: ProductsDb | null
	setCurrentRow: Dispatch<SetStateAction<ProductsDb | null>>
}

const ProductsContext = createContext<FiltersContextType | null>(null)

interface Props {
	children: ReactNode
}

export default function ProductsProvider({ children }: Props) {
	const [open, setOpen] = useDialogState<ProductsDialogType>(null)
	const [currentRow, setCurrentRow] = useState<ProductsDb | null>(null);
	const [data, setData] = useState<any>()
	return(
		<ProductsContext value={{ open, setOpen, currentRow, setCurrentRow, data, setData }}>
		{children}
	</ProductsContext>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProduct = () => {
	const productsContext = React.useContext(ProductsContext)

	if (!productsContext) {
		throw new Error('useProduct has to be used within <productsContext>')
	}

	return productsContext
}