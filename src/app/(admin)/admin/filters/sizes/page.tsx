import { getAllFilters } from '@/shared/api/admin/filters'
import { columns } from '@/shared/shadcnui/filter-table/filter-columns'
import { FilterPageTemplate } from '@/shared/shadcnui/layouts/filter-page-template'
import { filterListSchema } from '@/shared/types/schemas'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Размеры"
};

export default async function AdminFilterBandsPage() {
	const sizes = await getAllFilters('sizes')
	const data = filterListSchema.parse(sizes.success)
	return (
				<FilterPageTemplate title='Список размеров одежды' subtitle ='	Управление размерами одежды.' data={data} columns={columns} filterType='sizes' error={sizes.error}/>
	);
}
