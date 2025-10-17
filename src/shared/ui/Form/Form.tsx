import React from 'react'

interface Props{
	className?: string
	action: any
	children: React.ReactNode
}

export const Form = ({className,action, children}: Props) =>{
			return (
						<form onSubmit={action} className={className}>
							{children}
						</form>
			)
}