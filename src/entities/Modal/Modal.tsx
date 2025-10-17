"use client"
import { useRouter } from 'next/navigation'
import s from './Modal.module.scss'

interface Props{
children: React.ReactNode,
}
export const Modal = ({children}: Props) => {
	const router = useRouter()

	const handleClickOutside = (e:React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement
		if(target.classList.value === s.Modal) router.back()
	}

	return(
		<div className={s.Modal} onClick={handleClickOutside}>
			<div className={s.Container}>
			<button aria-label="close" className={s.Close} onClick={() => {
          router.back()
        }}>❌</button>
			{children}
			</div>
		</div>
	)
}