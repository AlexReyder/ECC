"use client"
import { signIn } from '@/shared/api/auth'
import { signInSchema } from '@/shared/types/schemas'
import { Form, FormContainer, FormFooter, FormHeader, FormSubmit, Input } from '@/shared/ui'
import { FormError } from '@/shared/ui/Form/FormError'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormSchema = z.infer<typeof signInSchema>

const AuthPopupLogin = ({includeHeading = true, className = '', btnClass = ''}: {includeHeading?: boolean, className?: string, btnClass?: string}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const {handleSubmit, register, formState:{ isDirty, isSubmitting, errors }} = useForm<FormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema)
  })
  
  async function onSubmit(data: FormSchema) {
    const {success, error} = await signIn(data)
    if(success){
      router.push('/')
    }
    setErrorMessage(error)
  }

  return (
      <FormContainer className={className}>
        {includeHeading ? ( <FormHeader title='Войти' description='Войти в свой личный аккаунт'/> ) : <></>}
         
        <Form action={handleSubmit(onSubmit)}>
           <Input registerName='email' register={register} errors={errors.email} type='email' placeholder='Электронная почта' />
           <Input registerName='password' register={register} errors={errors.password} type='password' placeholder='Пароль' />
           <FormSubmit 
            className = {btnClass}
            title='Войти' 
            isDisabled={!isDirty || isSubmitting}       
            isSubmitting={isSubmitting}
           />
        </Form>
        <FormFooter>
          <FormError errorMessage={errorMessage}/>
          <Link
                href='/password-recovery'
                className='inner__reset'
              >
                Восстановить пароль
          </Link>
        <div>
        <span className='inner__bottom__text'>
                Еще нет аккаунта?
                </span>
                <Link
                  href="/signup"
                  className='btn-reset inner__switch'
                >
                  Зарегистрироваться!
                </Link>
        </div>
        </FormFooter>
      </FormContainer>

  )
}

export default AuthPopupLogin
