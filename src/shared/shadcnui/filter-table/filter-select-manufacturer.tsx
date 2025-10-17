"use client"
import { getOneSpecification } from '@/shared/api/admin/specifications'
import { SpecificationType } from '@/shared/context/specifications-context'
import { useEffect, useState } from 'react'

export const FilterSelectManufacturer = ({specType, specId}:{specType: SpecificationType, specId: string}) => {
		const [data, setData] = useState(undefined)
		useEffect(()=>{
			const getMaterials = async() => {
				const mData = await getOneSpecification(specType, specId)
				setData(mData)
			}
				getMaterials()
		},[specType])

	return(
		<p>test</p>
		// <p>{data?.name}</p>
	)
}