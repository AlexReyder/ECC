import FiltersProvider, { FilterType } from '@/shared/context/filters-context'
import { FilterDialogs } from '@/shared/shadcnui/filter-table/dialogs/filter-dialogs'
import { FiltersTable } from '@/shared/shadcnui/filter-table/filter-table'
import { FiltersPrimaryButtons } from '@/shared/shadcnui/filters-primary-buttons'
import { Main } from '@/shared/shadcnui/layouts/main'
import { ErrorTemplate } from './error-template'

interface Props{
	title: string,
	subtitle: string,
	data: any
	columns: any
	filterType: FilterType
	error: string | null
}

export const FilterPageTemplate = ({title, subtitle, data, columns, filterType, error}: Props) => {
	return(
		<>
		{error === null ? 
		<FiltersProvider>
					<Main>
						<div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
								<div>
											<h2 className='text-2xl font-bold tracking-tight'>{title}</h2>
											<p className='text-muted-foreground'>
												{subtitle}
											</p>
								</div>
						<FiltersPrimaryButtons specType={filterType}/>
						</div>
						<div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
						{
							data ? 
						
						<FiltersTable data={data} columns={columns}  specType={filterType}/>
						: 

						<p>Нет данных</p>
						}
							</div>
					</Main>
					<FilterDialogs spec={filterType} />
		</FiltersProvider>
		: <ErrorTemplate/>}
		</>
	)
}
