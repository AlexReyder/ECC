
import { getAllCategories } from '@/shared/api/admin/categories'
import { SpecPageTemplate } from '@/shared/shadcnui/layouts/spec-page-template'
import { columns } from '@/shared/shadcnui/specification-table/specification-columns'
import { specificationListSchema } from '@/shared/types/schemas'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Категории"
};

export default async function AdminCategoriesPage() {

	const categories = await getAllCategories()
	const data  = specificationListSchema.parse(categories.success)
	return (
		<SpecPageTemplate 
				title='Категории' 
				subtitle='Управление категориями.' 
				data={data} 
				columns={columns} 
				error={categories.error}/>
	);
}
