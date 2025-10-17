import { Breadcrumbs } from '@/features'
import AuthPopupRegistration from '@/features/AuthPopup/AuthPopupRegistration'
import { Section } from '@/shared/ui'
import { Metadata } from 'next'
import s from './Signup.module.scss'

export const metadata: Metadata = {
  title: "Регистрация"
};

export default function SignUpPage() {
	return (
		<main className={s.Container}>
			<Section >
			<Breadcrumbs/>
			<div className={s.Wrapper}>
				<AuthPopupRegistration className={s.Modal}/>
			</div>
			</Section>
		</main>
	)
}