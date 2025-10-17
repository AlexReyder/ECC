"use client"
import { useRouter } from 'next/navigation'
import s from './Modal.module.scss'
import { useState } from 'react'
import ProductForm from '../Product/ProductForm'
import { ProductsDb } from '@/shared/types/validation/products'

interface Props {
 closeModal: any
 product: ProductsDb
}
export const SizeTableModal = ({ closeModal, product}: Props) => {
    const [sizeError, setSizeError] = useState('')
    let { id, isBestseller, isNew,name, description, colors, sizes, details, images, price, material, manufacturer, print, country, category, articleNumber, isInStock, adPrice } = product
    let colorsInfo = colors.map((color) => `${color.label}`)
    let sizesInfo = sizes.map((size) => `${size.label}`) 
    let materialInfo = material.length > 0 ? material[0].label : null
    
    const handleClickOutside = (e:React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        if(target.classList.value === s.Modal) closeModal(false)
    }

    return(
        <div className={s.Modal} onClick={handleClickOutside}>
            <div className={s.Container}>
            <button aria-label="close" className={s.Close} onClick={() => closeModal(false)}>❌</button>
                <ProductForm 
                    productId={id} 
                    name={name} 
                    colors={colorsInfo} 
                    sizes={sizesInfo} 
                    details={details} 
                    images={images} 
                    price={price} 
                    material={materialInfo} 
                    articleNumber={articleNumber} 
                    oColors = {product.colors} 
                    colorsFilter={product.colorsFilter}
                    />
            </div>
        </div>
    )
}