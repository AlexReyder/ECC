import { Breadcrumbs } from '@/features'
import AuthPopupLogin from '@/features/AuthPopup/AuthPopupLogin'
import { Section } from '@/shared/ui'
import { Metadata } from 'next'
import s from './Signin.module.scss'

export const metadata: Metadata = {
  title: "Вход"
};

export default function SignInPage() {
  return (
		<main className={s.Container}>
			<Section >
			<Breadcrumbs/>
			<div className={s.Wrapper}>
				<AuthPopupLogin includeHeading={true} className={s.Modal}/>
			</div>
			</Section>
		</main>
  )
}