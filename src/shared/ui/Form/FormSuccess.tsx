import s from './Form.module.scss'

export const FormSuccess = ({successMessage, className}: {successMessage: string | null, className?: string}) => {

	return(
		<>
		{
			successMessage? (
			<div className={`${s.ErrorBlock} ${className}`}>
				<p className={s.Success}>{successMessage}</p>
			</div>
			) : null
		}
		</>
	)
}