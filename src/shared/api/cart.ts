"use server"
import { CartItem, CartItems, ICartGetProducts, ICartGetProductsLength } from '@/shared/types/cart'
import { productFormSchema } from '@/shared/types/schemas'
import { revalidatePath } from 'next/cache'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { mergeArrays } from '../utils/common'
import { prisma } from './prismaInstance'
import { verifySession } from './session'

export async function removeDbCart(){
	const {isAuth, userId}= await verifySession()
	if(!isAuth){
		return {
			success: null,
			error: 'AUTH'
		}
	}

	const cart = await prisma.cart.findFirst({
		where: {
			userId: userId as string,
		}
	})

	  await prisma.cart.update({
		where: {
			id: cart?.id,
		}, 
		data:{
			products: JSON.stringify([])
		}
		
	})


	return {
		success: true,
		error: null
	}
}

export async function removeLocalCart(){
	const cookieStore = await cookies()
	if(cookieStore.has('cart')){
		cookieStore.delete('cart');
		return {
			success: true,
			error: null
		}
	}
	return {
		success: true,
		error: null
	}
}

export async function syncCart(userId: string){
	let localCartProducts;
	let localCartProductsJson;
	let DBCartProducts;
	let DBCartProductsJson;

	const cookieStore = await cookies()
	if(cookieStore.has('cart')){
		localCartProductsJson = cookieStore.get('cart')?.value as string
		localCartProducts = JSON.parse(localCartProductsJson) as CartItems
		if(localCartProducts.length === 0){
			return {
				success: true,
				error: null
			}
		}
	}

	const dbCart = await prisma.cart.findFirst({where:{userId: userId}});
	if(dbCart){
		DBCartProductsJson = dbCart.products as string
		DBCartProducts = JSON.parse(DBCartProductsJson)
	} else {
			 await prisma.cart.create({
				data: {
					userId: userId as string,
					products: JSON.stringify([]),
				}
			})
	}

	if(localCartProductsJson === DBCartProductsJson){
		return {
			success: true,
			error: null
		}
	} else {
		const result = mergeArrays(localCartProducts, DBCartProducts, (a, b) => a.productId === b.productId && a.size === b.size && a.color === b.color);

		const updatedData = await prisma.cart.update({
			where: {id: dbCart?.id},
			data: {
				products: JSON.stringify(result)
			}
		})
			return {
			success: true,
			error: null
			}
	}
}
 

export async function addProductToCart(unsafeData: z.infer<typeof productFormSchema>){
	const { success, data } = productFormSchema.safeParse(unsafeData)
	if (!success) return {
		success: null,
		error: 'Неправильно введенные данные'
	}
	revalidatePath('/')
	const cookieStore = await cookies()
	const {isAuth, userId}= await verifySession()
	if(!isAuth){
		const isCartExist = cookieStore.has('cart')
		if(!isCartExist){
			cookieStore.set('cart', JSON.stringify([data]))
			return {
				success: true,
				error: null
			}
		}
		const cart = cookieStore.get('cart') as RequestCookie 
		const cartData: z.infer<typeof productFormSchema>[] = JSON.parse(cart.value)
		const result = mergeProductsInCart(cartData, data);
		cookieStore.set('cart', JSON.stringify(result))
		
		return {
			success: true,
			error: null
		}
		
	}

	const getProducts = await prisma.cart.findFirst({where:{userId: userId as string}});

	if (getProducts?.products) {
		const productsStr = getProducts.products as string
		const products = JSON.parse(productsStr)

		const result = mergeProductsInCart(products, data);

		const addData = await prisma.cart.update({
		where: {id: getProducts.id},
		data: {
			products: JSON.stringify(result)
		}
	})
		return {
		success: true,
		error: null
		}
	} 
}

export async function removeProductFromCart(data: CartItem){
	const cookieStore = await cookies()
	const {isAuth, userId}= await verifySession()
		if(!isAuth){
			const cart = cookieStore.get('cart') as RequestCookie 
			const cartData: z.infer<typeof productFormSchema>[] = JSON.parse(cart.value)
		
			const result = filterProductsInCart(cartData, data)	
			cookieStore.set('cart', JSON.stringify(result))
			revalidatePath('/cart')
			return {
				success: true,
				error: null
			}
	}

	const cart = await prisma.cart.findFirst({
		where: {
			userId: userId as string,
		}
	})

	if(!cart){
		return {
			success: false,
			error: null,
		}
	}	
	const productsStr = cart.products as string 
	const products = JSON.parse(productsStr)

	const result = filterProductsInCart(products, data)		
	try{
		const addData = await prisma.cart.update({
			where: {id: cart.id},
			data: {
				products: JSON.stringify(result)
			}
		})
		revalidatePath('/cart')
		return {
			success: true,
			error: null
		}
	} catch(e){
		return {
			success: false,
			error: e as string
		}
	}

}

export async function updateProductFromCart(data: Partial<CartItem>, count: number){
	const cookieStore = await cookies()
	const {isAuth, userId}= await verifySession()
	if(!isAuth){
		const cart = cookieStore.get('cart') as RequestCookie 
		const cartData: z.infer<typeof productFormSchema>[] = JSON.parse(cart.value)
		const mutatedData = compareQuantityCarts(cartData, data, count)
		cookieStore.set('cart', JSON.stringify(mutatedData))
		revalidatePath('/cart')
		return {
			success: true,
			error: null
		}
	}

	const cart = await prisma.cart.findFirst({
		where: {
			userId: userId as string,
		}
	})

	if(!cart){
		return {
			success: false,
			error: null,
		}
	}	
	const productsStr = cart.products as string 
	const products = JSON.parse(productsStr)
	const mutatedData = compareQuantityCarts(products, data, count)
	try{
		const addData = await prisma.cart.update({
			where: {id: cart.id},
			data: {
				products: JSON.stringify(mutatedData)
			}
		})
		revalidatePath('/cart')
		return {
			success: true,
			error: null
		}
	} catch(e){
		return {
			success: false,
			error: e as string
		}
	}
}

export async function getProductsFromCart(): Promise<ICartGetProducts> {
	const {isAuth, userId}= await verifySession()
	if(!isAuth){
		const cookieStore = await cookies()
		const cart = cookieStore.get('cart')
		if(!cart){
			return {
				success: [],
				error: null,
			}
		}	
		return {
			success: JSON.parse(cart.value),
			error: null,
		}
	}

	try {
		const cart = await prisma.cart.findFirst({
			where: {
				userId: userId as string,
			}
		})
	
		if(!cart){
			return {
				success: [],
				error: null,
			}
		}	
		const products = cart.products as string 
		return {
			success: JSON.parse(products),
			error: null,
		}
	} catch(e){
		return {
			success: [],
			error: e as string,
		}
	}
}

export async function getProductsCartLength(): Promise <ICartGetProductsLength>{
	const {isAuth, userId}= await verifySession()
	if(!isAuth){
		const cookieStore = await cookies()
		const cart = cookieStore.get('cart')
		if(!cart){
			return {
				success: 0,
				error: null,
			}
		}	
		const cartData: CartItems = JSON.parse(cart.value)
		return {
			success: cartData.length,
			error: null,
		}
	}

	try{
		const cart = await prisma.cart.findFirst({
			where: {
				userId: userId as string,
			}
		})
	
		if(!cart){
			return {
				success: 0,
				error: null,
			}
		}	
		const products = cart.products as string 
		return {
			success: JSON.parse(products).length,
			error: null,
		}
	} catch(e){
		return {
			success: 0,
			error: e as string,
		}
	}
}


 function compareQuantityCarts(
	originalData: CartItems,
	compareData: Partial<CartItem>,
	quantityCompare: number): CartItems{

	const result = originalData.map((item:CartItem) => {
			if(item.productId === compareData.productId &&
				item.color === compareData.color &&
				item.size === compareData.size){
				item.quantity = quantityCompare.toString();
				return item;
			}
			return item;
		})
		return result;

}

function filterProductsInCart(data: CartItems, compareData: CartItem): CartItems{
	const result = data.filter((item:CartItem) => {
		if(item.productId === compareData.productId &&
			 item.color === compareData.color &&
			 item.size === compareData.size){
			return false;
		}
		return true
	})	
	return result
}

const mergeProductsInCart = (a: CartItems, b: CartItem) => {
	if(a.length === 0){
		a.push(b);
		return a;
	}

	const c = [...a];
	const index = c.findIndex((el) => el.productId === b.productId && el.size === b.size && el.color === b.color)

	if(index !== -1){
		const element = c[index]
		element.quantity = (Number.parseInt(element.quantity) + Number.parseInt(b.quantity)).toString()
		return c
	}

	c.push(b);

	return c;



	// const c = [...a];
	// let finded = false
	// c.forEach((aItem: any) => {
	// 	if(!finded){
	// 		if(predicate(aItem,b)){
	// 			console.log('A: ',aItem)
	// 			console.log('B: ',b)
	// 			aItem.quantity = (Number.parseInt(aItem.quantity) + Number.parseInt(b.quantity)).toString();
	// 			finded = true;
	// 		} else {
	// 			c.push(b)
	// 		}
	// 	}

	// })
	// return c;
}