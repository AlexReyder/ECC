"use client"
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { ChangeEvent, useEffect, useState } from 'react'
import slug from 'slug'
import s from './CatalogFilters.module.scss'

const FilterEntity = ({data, name}: {data: string[], name: string}) => {
	const state: Record<string, boolean> = data.reduce((a, v) => ({ ...a, [v]: false}), {}); 
	const [offset, setOffset] = useQueryState('offset', parseAsInteger.withDefault(1))
	const [query, setQuery] = useQueryState(name,
		parseAsArrayOf(parseAsString, ';').withOptions({ shallow: false }))
	const [inputs, setInputs] = useState(state)

	function handleChange (e: ChangeEvent<HTMLInputElement>, rendered:any){
		setInputs((prevState) => ({
					...prevState,
					[rendered]: e.target.checked,
				}))
	}

	function updateQuery(){
		let state = []
		for(let prop in inputs){
			if(inputs[prop]){
				state.push(slug(prop))
			}
		}
		return state.length > 0 ? state : null
	}

	useEffect(() => {
		let state = updateQuery()
		setQuery(state)
		setOffset(1)
	}, [inputs])
	
		
	return(
	<div>
			{data && (
			data.map((item:any) => {
				const rendered: any = item;
				return (
					<div key={rendered} className={s.FilterContainer}>
						<input type="checkbox" name={rendered} id={rendered} className={s.FilterInput} value={slug(rendered)} onChange={(e) => handleChange(e, rendered)} checked={inputs[`${rendered}`]}/>
						<label htmlFor={rendered} className={s.FilterText}>{name === 'colors' ? rendered : rendered}</label>
					</div>
				)
			})
		)}
	</div>
	)
}

export default FilterEntity

