"use server"

import { headers } from 'next/headers'
import { prisma } from './prismaInstance'


export async function getFiltersData(){
	// const colorsDb = await prisma.colors.findMany()
	// const colors = colorsDb.map((color) => color)
	// const data: any = {
	// 	colors: ["black", "white", "yellow", "blue", "green", "red"],
	// 	sizes: ["x" , "xl" , "xxl", "l"],
	// }

	const colorsDb = await prisma.colors.findMany()
	const colors = colorsDb.map((color) => color.name)

	const sizesDb = await prisma.sizes.findMany()
	const sizes = sizesDb.map((color) => color.name)

	const manufacturerDb = await prisma.manufacturer.findMany()
	const manufacturer = manufacturerDb.map((color) => color.name)

	const genreDb = await prisma.genre.findMany()
	const genre = genreDb.map((color) => color.name)
	
	const bandDb = await prisma.band.findMany()
	const bands = bandDb.map((color) => color.name)

	const data: any = {
		bands,
		colors: colors,
		sizes,
		genre,
		manufacturer
	}

	// const bands = await prisma.band.findMany({select:{name:true}});
	// 	if(!bands) { data.bands = null} else {data.bands = bands}

	// const details = await prisma.shoppingCard.findFirst({});

	return {
		success: data, 
		error: null
	}	
}

export async function filter(){
	const headersList = await headers()
}