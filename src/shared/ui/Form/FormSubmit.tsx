import { cn } from '@/shared/utils'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import s from './Form.module.scss'
interface Props{
	title: string
	isDisabled: boolean
	isSubmitting: boolean
	className?: string
}

export const FormSubmit = ({title, isDisabled, isSubmitting, className = ''}: Props) =>{
			return (
							<button 
								className={cn(s.FormSubmit, className)} 
								type='submit' 
								disabled={isDisabled}
							>
														{isSubmitting ? (
															<FontAwesomeIcon icon={faSpinner} spin />
														) : title }
							</button>
			)
}