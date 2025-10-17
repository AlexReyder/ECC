import { getAllProducts, getAvailableSpecsAndFilters } from '@/shared/api/admin/products'
import ProductsProvider from '@/shared/context/products-context'
import { Main } from '@/shared/shadcnui/layouts/main'
import { ProductPrimaryButtons } from '@/shared/shadcnui/product-primary-buttons'
import { ProductsDialogs } from '@/shared/shadcnui/product-table/dialogs/product-dialogs'
import { columns } from '@/shared/shadcnui/product-table/product-columns'
import { ProductsTable } from '@/shared/shadcnui/product-table/product-table'
import { Metadata } from 'next'
import { Suspense } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const metadata: Metadata = {
	title: "Товары"
};


export default function AdminDashboardPage() {
		const tableDataRaw = getAllProducts()
		const availableFS = getAvailableSpecsAndFilters()
		return (
			<ProductsProvider>
					<Main>
						<div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
								<div>
											<h2 className='text-2xl font-bold tracking-tight'>Список товаров</h2>
											<p className='text-muted-foreground'>
												Управление товарами.
											</p>
								</div>
								<ProductPrimaryButtons/>
						</div>
						<div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
							<Suspense fallback={<Skeleton count={7}/>}>
								<ProductsTable data={tableDataRaw} columns={columns} />
							</Suspense>
						</div>
						</Main>
						<Suspense fallback={<Skeleton count={3}/>}>
							<ProductsDialogs data={availableFS}/>
						</Suspense>
			</ProductsProvider>
	);
}
