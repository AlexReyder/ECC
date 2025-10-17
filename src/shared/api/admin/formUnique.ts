"use server"

import { prisma } from '../prismaInstance'

export async function uniqueProductName(name: string){
	try {
		const findedEl = await prisma.shoppingCard.findFirst({
		where: {
			name
		}
	})
	if(findedEl){
		return false
	}
		return true
	} catch(e){
		console.log(e)
	}
}


export async function uniqueProductArticleNumber(articleNumber: string){
	try {
		const findedEl = await prisma.shoppingCard.findFirst({
		where: {
			articleNumber
		}
	})
	if(findedEl){
		return false
	}
		return true
	} catch(e){
		console.log(e)
	}
}

export async function uniqueProductBand(name: string){
	try {
		const findedEl = await prisma.band.findFirst({
		where: {
			name
		}
	})
	if(findedEl){
		return false
	}
		return true
	} catch(e){
		console.log(e)
	}
}