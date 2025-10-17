"use client"
import { parseAsInteger, useQueryState } from 'nuqs'
import ReactPaginate from 'react-paginate'
import s from './CatalogPagination.module.scss'
interface Props {
	productsCount: number
}

export const CatalogPagination = ({productsCount}: Props) => {
		const [offset, setOffset] = useQueryState('offset', parseAsInteger.withDefault(1).withOptions({shallow: false, history: 'push', scroll: true, throttleMs: 1000}))
		const pagesCount = Math.ceil((productsCount || 12) / 12)
		const paginationProps = {
				containerClassName: s.ContainerClassName,
				pageClassName: s.PageClassName,
				pageLinkClassName: s.PageLinkClassName,
				previousClassName: `catalog-pagination-prev ${s.BottomList__prev}`,
				nextClassName: `catalog-pagination-next ${s.BottomList__next}`,
				breakClassName: s.Break,
				breakLinkClassName: s.Break__link,
				breakLabe: '...',
				pageCount: pagesCount,
				forcePage: offset - 1,
				activeClassName: s.Active
				
		}

		const handlePageChange = ({ selected }: { selected: number }) => {
			 setOffset(selected + 1)
			}
		

	return(
		<div className={s.Botton}>
		<ReactPaginate
			{...paginationProps}
			nextLabel={<span>Дальше</span>}
			previousLabel={
				<span>Назад</span>
			}
			onPageChange={handlePageChange}
		/>
	</div>
	)
}