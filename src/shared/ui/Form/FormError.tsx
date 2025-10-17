import s from './Form.module.scss'

export const FormError = ({errorMessage, className}: {errorMessage: string | null, className?: string}) => {

	return(
		<>
		{
			errorMessage? (
			<div className={`${s.ErrorBlock} ${className}`}>
				<p className={s.Error}>{errorMessage}</p>
			</div>
			) : null
		}
		</>
	)
}