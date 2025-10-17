
import { getAllFilters } from '@/shared/api/admin/filters'
import { columns } from '@/shared/shadcnui/filter-table/filter-columns'
import { FilterPageTemplate } from '@/shared/shadcnui/layouts/filter-page-template'
import { filterListSchema } from '@/shared/types/schemas'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Материалы"
};

export default async function AdminFilterMaterialsPage() {
	const materialsData = await getAllFilters('material')
	const data = filterListSchema.parse(materialsData.success)
	return (
			<FilterPageTemplate 
			title='Материалы' 
			subtitle ='Управление материалами.' 
			data={data} 
			columns={columns} filterType='materials' error={materialsData.error}/>
	);
}
