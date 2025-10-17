"use client"
import { resetPassword } from '@/shared/api/auth'
import { profilePassword } from '@/shared/types/schemas'
import { Form, FormContainer, FormHeader, FormSubmit, Input } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormSchema = z.infer<typeof profilePassword>
interface RecoveryPasswordProps{
	className?: string,
	email: string,
	token: string
}
const RecoveryPassword = ({className, email, token}: RecoveryPasswordProps) => {
		const {handleSubmit, register, formState:{ isDirty, isSubmitting, errors }} = useForm<FormSchema>({
			defaultValues: {
				password:'',
				confirmPassword:'',
			},
			resolver: zodResolver(profilePassword)
		})

		async function onSubmit(data: FormSchema) {
			const {success, error} = await resetPassword(email, token, data)
			if(success){
				redirect('/')
			}
			console.log(error)
			console.log(success)
			// setError(error)
		}


	return (
		<FormContainer className={className}>
				<FormHeader title='Восстановление пароля' description='Введите новый пароль от аккаунта.'/>
				<Form action={handleSubmit(onSubmit)}>
				<Input registerName='password' register={register} errors={errors.password} type='password' placeholder='Пароль' />
				<Input registerName='confirmPassword' register={register} errors={errors.confirmPassword} type='password' placeholder='Повторите пароль' />
					<FormSubmit 
						title='Сохранить' 
						isDisabled={!isDirty || isSubmitting}       
						isSubmitting={isSubmitting}
					/>
				</Form>

		</FormContainer>
	)
}

export default RecoveryPassword