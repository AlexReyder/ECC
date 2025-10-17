import { confirmEmail } from '@/shared/api/auth'
import { redirect } from 'next/navigation'

export default async function EmailVerificationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const params = await searchParams

	const email = params.email as string;
	const token = params.token as string;

	const {success, error} = await confirmEmail(email, token)
	if(success) {
		redirect('/')
	}
	return (
		<div>
			<h2>{error}</h2>
		</div>
	);
}
