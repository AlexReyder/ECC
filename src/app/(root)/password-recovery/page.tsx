import { Breadcrumbs } from '@/features'
import RecoveryPassword from '@/features/RecoveryPassword/RecoveryPassword'
import RecoveryPasswordEmail from '@/features/RecoveryPassword/RecoveryPasswordEmail'
import { Section } from '@/shared/ui'
import { Metadata } from 'next'
import s from './styles.module.scss'

export const metadata: Metadata = {
  title: "Восстановления пароля"
};

export default async function RecoveryPasswordPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>
}) {
	const params = await searchParams

	const email = params.email;
	const token = params.token;

	return (
		<main className={s.Container}>
			<Section>	
			<Breadcrumbs/>
			<div className={s.Wrapper}>
			{
				email === undefined ||  token === undefined ? (
					<RecoveryPasswordEmail className={s.Modal}/>
				) : (
					<RecoveryPassword className={s.Modal} email={email} token={token}/>
				)
			}
			</div>
			</Section>
		</main>
	);
}
