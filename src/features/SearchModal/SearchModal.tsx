"use client"

export const SearchModal = () => {
  // const [, setSearchValue] = useState('')
  // const [, startTransition] = useTransition()
  // const delayCallback = useDebounceCallback(1000)
  // const productsBySearch = useUnit($productsBySearch)
  // const spinner = useUnit(loadProductBySearchFx.pending)

  // const searchedProductsCategories = useMemo(
  //   () =>
  //     productsBySearch.items?.length
  //       ? [...new Set(productsBySearch.items.map((item:any) => item.category))]
  //       : [],
  //   [productsBySearch.items]
  // )

  // const searchedProductsTypes = useMemo(
  //   () =>
  //     productsBySearch.items?.length
  //       ? [
  //         ...new Map(
  //           productsBySearch.items.map((item:any) => [item.type, item])
  //         ).values(),
  //       ]
  //       : [],
  //   [productsBySearch.items]
  // )

  // const handleInputFocus = (
  //   e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  // ) => {
  //   e.target.classList.add('with_value')
  // }

  // const handleInputBlur = (
  //   e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  // ) => {
  //   if (e.target.value) {
  //     return
  //   }

  //   e.target.classList.remove('with_value')
  // }

  // const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   startTransition(() => setSearchValue(e.target.value))

  //   if (!e.target.value.length) {
  //     delayCallback(() => '')
  //     resetProductBySearch()
  //     return
  //   }

  //   delayCallback(() => loadProductBySearch({ search: e.target.value.trim() }))
  // }

  return (
    <div className='search-modal'>
      <button
        className='btn-reset search-modal__close'
        // onClick={handleCloseSearchModal}
      />
      <h3 className='search-modal__title'>
        Поиск товаров
      </h3>

    </div>
  )
}

