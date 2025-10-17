"use client"
import useDialogState from '@/shared/hooks/use-dialog-state'
import { SpecificationAdmin } from '@/shared/types/schemas'
import React, { useState } from 'react'

type SpecificationsDialogType = 'add' | 'edit' |'delete' 

interface SpecificationsContextType {
	open: SpecificationsDialogType | null
	setOpen: (str: SpecificationsDialogType | null) => void
	setSpecType: (str: SpecificationType | null) => void
	currentRow: SpecificationAdmin | null
	setCurrentRow: React.Dispatch<React.SetStateAction<SpecificationAdmin | null>>
	data?: any
	setData?: any
}

const SpecificationsContext = React.createContext<SpecificationsContextType | null>(null)

interface Props {
	children: React.ReactNode
}

export default function SpecificationsProvider({ children }: Props) {
	const [open, setOpen] = useDialogState<SpecificationsDialogType>(null)
	const [data, setData] = useState<any>(null)
	const [currentRow, setCurrentRow] = useState<SpecificationAdmin | null>(null)

	return (
		<SpecificationsContext value={{ open, setOpen, currentRow, setCurrentRow, data, setData }}>
			{children}
		</SpecificationsContext>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSpecification = () => {
	const specificationsContext = React.useContext(SpecificationsContext)

	if (!specificationsContext) {
		throw new Error('useSpecification has to be used within <SpecificationsContext>')
	}

	return specificationsContext
}
