"use client"
import { useRouter, usePathname } from 'next/navigation'
import { ChangeEvent, KeyboardEvent, useState, useRef, useEffect } from 'react'
import s from './Search.module.scss'

export const Search = () => {
	const [search, setSearch] = useState('')
	const [open, setOpen] = useState(false)
	const router = useRouter()
	const pathname = usePathname()
	const ref = useRef(pathname)

	useEffect(() => {
    	setOpen(false)
    }, [pathname])
	
	const handleSearch = () => {
		setOpen(!open)
		if(search){
			router.push(`/catalog?search=${search}`)
		}
	}

	const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if(search){
				setOpen(!open)
				router.push(`/catalog?search=${search}`)
			}
    }
  }

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}
	
	return(
		<div className={s.Container}> 
			<input type='search' className={s.Search} placeholder='Поиск товаров' onChange={handleChange}  onKeyDown={handleKeyDown} />
			<button
			className={s.Button}
			onClick={handleSearch}
			/>
			<div className={`${s.Popover} ${open ? s.Open: ''}`}>
				<input type='search' className={s.SearchMobile} placeholder='Поиск товаров' onChange={handleChange} onKeyDown={handleKeyDown} />
			</div>

		</div>
	)
}
