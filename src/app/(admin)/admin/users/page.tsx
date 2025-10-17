import { getAllUsers } from '@/shared/api/admin/users'
import UsersProvider from '@/shared/context/users-context'
import { ErrorTemplate } from '@/shared/shadcnui/layouts/error-template'
import { Main } from '@/shared/shadcnui/layouts/main'
import { UsersDialogs } from '@/shared/shadcnui/user-table/dialogs/users-dialogs'
import { UsersTable } from '@/shared/shadcnui/user-table/user-table'
import { columns } from '@/shared/shadcnui/user-table/users-columns'
import { UsersPrimaryButtons } from '@/shared/shadcnui/users-primary-buttons'
import { userListSchema } from '@/shared/types/schemas'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Пользователи"
};

export default async function AdminDashboardPage() {
	const users = await getAllUsers()
	const usersData = userListSchema.parse(users.success)
	return (
		<>
		{ users.error === null ? 
			<UsersProvider>
						<Main>
							<div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
								<div>
									<h2 className='text-2xl font-bold tracking-tight'>Пользователи</h2>
									<p className='text-muted-foreground'>
										Список пользователей.
									</p>
								</div>
								<UsersPrimaryButtons />
							</div>
							<div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
								<UsersTable data={usersData} columns={columns} />
							</div>
						</Main>
					<UsersDialogs />
			</UsersProvider> 
			: 
			<ErrorTemplate/>
		}
		</>
	);
}
