"use client"
import { signUp } from '@/shared/api/auth'
import { signUpSchema } from '@/shared/types/schemas'
import { Form, FormContainer, FormFooter, FormHeader, FormSubmit, Input } from '@/shared/ui'
import { CheckboxForm } from '@/shared/ui/Form/FormCheckbox'
import { FormError } from '@/shared/ui/Form/FormError'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormSchema = z.infer<typeof signUpSchema>

const AuthPopupRegistration = ({className = '', btnClass=''}: {className?: string, btnClass?: string}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const {handleSubmit, register, formState:{ isDirty, isSubmitting, errors }} = useForm<FormSchema>({
      defaultValues: {
        name:"",
        surname:"",
        patronymic: "",
        phone:"",
        email: "",
        password: "",
        whatsapp: false,
        telegram: false,
      },
      resolver: zodResolver(signUpSchema)
    })

    async function onSubmit(data: FormSchema) {
      const {success, error} = await signUp(data)
      if(success){
        router.push('/signin')
      }
      setErrorMessage(error)
    }


  return (

      <FormContainer className={className}>
      <FormHeader title='Регистрация' description='Создать аккаунт'/>   
        <Form action={handleSubmit(onSubmit)}>
        <Input registerName='surname' register={register} errors={errors.email} type='text' placeholder='Фамилия' />
        <Input registerName='name' register={register} errors={errors.email} type='text' placeholder='Имя' />
         <Input registerName='patronymic' register={register} errors={errors.patronymic} type='text' placeholder='Отчество' />
        <Input registerName='email' register={register} errors={errors.email} type='email' placeholder='Электронная почта' />
        <Input registerName='phone' register={register} errors={errors.email} type='text' placeholder='Номер телефона' />
        <Input registerName='password' register={register} errors={errors.password} type='password' placeholder='Пароль' />
        <CheckboxForm registerName='whatsapp' register={register} errors={errors.whatsapp} labelText='WhatsApp привязан к телефону'/>
        <CheckboxForm registerName='telegram' register={register} errors={errors.telegram} labelText='Telegram привязан к телефону'/>
        <FormSubmit 
                className={btnClass}
                title='Создать аккаунт' 
                isDisabled={!isDirty || isSubmitting}       
                isSubmitting={isSubmitting}
        />
        <FormFooter>
        <FormError errorMessage={errorMessage}/>
        <span className='inner__bottom__text'>
               Уже есть аккаунт?
              </span>
              <Link
                href='/signin'
                className='btn-reset inner__switch'
              >
               Войти!
              </Link>
        </FormFooter>
        </Form>
      </FormContainer>
  )
}

export default AuthPopupRegistration
