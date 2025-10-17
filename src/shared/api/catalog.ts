"use server"
import { ValidateProductsDbSchema } from '../types/validation/products'
import { gResponse } from '../utils/common'
import { prisma } from './prismaInstance'



export async function getAllProducts(selected: number = 1){
	const products = await prisma.shoppingCard.findMany();
	const {data} = await ValidateProductsDbSchema.safeParseAsync(products)

	return data
}

// export async function getProductsByCategory(slug: string, selected: number){
// 	console.log(slug)
// 	// const category = await prisma.category.findFirst({where:{slug}})
// 	// const products = await prisma.shoppingCard.findMany({
// 	// 	where: {
// 	// 		category: {
// 	// 			path:["cherniy"],
// 	// 			array_contains:[]
				
// 	// 		},
// 	// 	},
// 	// })

// 	const categoryName = await prisma.category.findFirst({where: {slug}, select:{name: true}})
// 	return {
// 		success: {products,
// 			length: products.length,
// 			categoryName
// 		},
// 		error: null
// 	}
// }

export async function getOneProduct(productId: string){
	try {

		const product = await prisma.shoppingCard.findFirst({where:{slug:productId}})

		if(!product) return {
			success: null,
			error: 'Товар не найден'
		}

		return gResponse(product, null)

	} catch(e) {
		return gResponse(null, e as  string)
	}


}


