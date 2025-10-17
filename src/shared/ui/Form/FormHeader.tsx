import s from './Form.module.scss'
interface Props{
	title: string,
	description: string,
	children?: React.ReactNode
}
export const FormHeader = ({title, description, children}: Props) => {

	return(
		<div>
			 <h3 className={s.FormTitle}>
            {title}
			 </h3>
        <p className={s.FormDescription}>
          	{description}
        </p>
			{children}
		</div>
	)
}
