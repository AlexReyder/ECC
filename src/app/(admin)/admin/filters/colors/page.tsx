import { getAllFilters } from '@/shared/api/admin/filters'
import { columns } from '@/shared/shadcnui/filter-table/filter-columns'
import { FilterPageTemplate } from '@/shared/shadcnui/layouts/filter-page-template'
import { filterListSchema } from '@/shared/types/schemas'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Цвета"
};

export default async function AdminFilterBandsPage() {
	const colorsData = await getAllFilters('colors')
	const data = filterListSchema.parse(colorsData.success)
	return (
			<FilterPageTemplate title='Список цветов одежды' subtitle ='	Управление цветами одежды.' data={data} columns={columns} filterType='colors' error={colorsData.error}/>
	);
}
