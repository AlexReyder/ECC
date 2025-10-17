import SpecificationsProvider, { SpecificationType } from '@/shared/context/specifications-context'
import { Main } from '@/shared/shadcnui/layouts/main'
import { SpecificationDialogs } from '../specification-table/dialogs/specification-dialogs'
import { SpecificatiosTable } from '../specification-table/specification-table'
import { SpecsPrimaryButtons } from '../specs-primary-buttons'
import { ErrorTemplate } from './error-template'

interface Props{
	title: string,
	subtitle: string,
	data: any
	columns: any
	error: string | null
}

export const SpecPageTemplate = ({title, subtitle, data, columns, error}: Props) => {
	return(
		<>
		{error === null ? 
		<SpecificationsProvider>
					<Main>
						<div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
								<div>
											<h2 className='text-2xl font-bold tracking-tight'>{title}</h2>
											<p className='text-muted-foreground'>
												{subtitle}
											</p>
								</div>
						<SpecsPrimaryButtons/>
						</div>
						<div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
								<SpecificatiosTable data={data} columns={columns}/>
						</div>
					</Main>
					<SpecificationDialogs/>
		</SpecificationsProvider>
		: <ErrorTemplate/>}
		</>
	)
}
