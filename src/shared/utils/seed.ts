"use server"

import { PrismaClient } from '@prisma/client'
import slug from 'slug'


const randomDecimalNumber = (min:number, max:number) => {
	const num = Math.floor(Math.random() * (max - min) * 10 + min * 10)/10
  return Math.round(num)
};

const randomDecimalNumberToString = (min: number, max: number) => {
	const num = Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
  return num.toString();
};

const get4RandomStrings = (arr: string[]) => {
	const images = [];
	for (let i = 0; i < 4; i++) {
		const index = randomDecimalNumber(0, arr.length - 2);
		console.log(index)
		images.push(arr[index])
	}
	return images
}

const getRandomArray = (arr:any[]) => {
	const end = Math.floor(Math.random()*arr.length);
	const a = arr.slice(0,)
	return a
}


const bandIds = [  
	'406d28b9-0be2-4a54-8b93-02ef95be32be' ,
  'aeaac530-23a8-4100-b64d-7c5ada803a8b' ,
  'acf8e179-2de1-4a0e-ac79-e1edcb5f48d3' ,
  '22fac63c-7d19-44f2-89f9-a3736ceabc84' ]

const categoryIds = [ 
	'dd953241-80bd-430f-b57b-a97e927a2718' ,
  '25ecf9e6-273c-4e03-a816-bd8b653088c2' ,
  'b2bd86f4-c1ff-490b-bbae-dd95782d2587' ,
  'a5a840ad-0448-4ccf-8d26-c66c0eaf36be' 
	]

const color = ["blue", "black", "red", "green", "yellow", "white"]
const sizes = ["s", "l", "m", "xl","xxl"]

// const product = {
// 	price: randomDecimalNumber(1000, 6000),
// 	category: randomDecimalNumber(0, category.length - 1),
// 	color: randomDecimalNumber(0, color.length - 1),
// 	sizes: randomDecimalNumber(0, sizes.length - 1),
// }

// const inStock = {
// 	colors:{

// 	}
// }

// const sizes = {
// 	blue: {
// 		x:1,
// 		l:4,
// 		m:5,
// 		xl:3,
// 		xxl: 6,
// 	}
// }

const imagesClothes = ["img/clothes/flag_carcass_heartwork.JPG",
"img/clothes/flag_carcass_heartwork10.JPG",
"img/clothes/flag_carcass_heartwork3.JPG",
"img/clothes/flag_carcass_heartwork4.JPG",
"img/clothes/flag_carcass_heartwork5.JPG",
"img/clothes/flag_carcass_heartwork6.JPG",
"img/clothes/flag_carcass_heartwork7.JPG",
"img/clothes/flag_carcass_heartwork9.JPG",
"img/clothes/flag_overkill_the_years_of_decay.JPG",
"img/clothes/flag_overkill_the_years_of_decay10.JPG",
"img/clothes/flag_overkill_the_years_of_decay11.JPG",
"img/clothes/flag_overkill_the_years_of_decay12.JPG",
"img/clothes/flag_overkill_the_years_of_decay3.JPG",
"img/clothes/flag_overkill_the_years_of_decay4.JPG",
"img/clothes/flag_overkill_the_years_of_decay6.JPG",
"img/clothes/flag_overkill_the_years_of_decay8.JPG",
"img/clothes/flag_overkill_the_years_of_decay9.JPG",
"img/clothes/longsleeve_behemoth_tour_green_logo_hb_l.JPG",
"img/clothes/longsleeve_behemoth_tour_green_logo_hb_l11.JPG",
"img/clothes/longsleeve_behemoth_tour_green_logo_hb_l2.JPG",
"img/clothes/longsleeve_behemoth_tour_green_logo_hb_l3.JPG",
"img/clothes/longsleeve_behemoth_tour_green_logo_hb_l4.JPG",
"img/clothes/longsleeve_behemoth_tour_green_logo_hb_l5.JPG",
"img/clothes/longsleeve_behemoth_tour_green_logo_hb_l6.JPG",
"img/clothes/longsleeve_behemoth_tour_green_logo_hb_l7.JPG",
"img/clothes/longsleeve_behemoth_tour_green_logo_hb_l8.JPG",
"img/clothes/longsleeve_behemoth_tour_green_logo_hb_l9.JPG",
"img/clothes/longsleeve_cannibal_corpse_sacrifice_confessions_hb_l.JPG",
"img/clothes/longsleeve_cannibal_corpse_sacrifice_confessions_hb_l10.JPG",
"img/clothes/longsleeve_cannibal_corpse_sacrifice_confessions_hb_l11.JPG",
"img/clothes/longsleeve_cannibal_corpse_sacrifice_confessions_hb_l2.JPG",
"img/clothes/longsleeve_cannibal_corpse_sacrifice_confessions_hb_l3.JPG",
"img/clothes/longsleeve_cannibal_corpse_sacrifice_confessions_hb_l4.JPG",
"img/clothes/longsleeve_cannibal_corpse_sacrifice_confessions_hb_l5.JPG",
"img/clothes/longsleeve_cannibal_corpse_sacrifice_confessions_hb_l6.JPG",
"img/clothes/longsleeve_cannibal_corpse_sacrifice_confessions_hb_l7.JPG",
"img/clothes/longsleeve_cannibal_corpse_sacrifice_confessions_hb_l8.JPG",
"img/clothes/longsleeve_cannibal_corpse_sacrifice_confessions_hb_l9.JPG",
"img/clothes/longsleeve_dio_holy_diver_hb_l.JPG",
"img/clothes/longsleeve_dio_holy_diver_hb_l10.JPG",
"img/clothes/longsleeve_dio_holy_diver_hb_l11.JPG",
"img/clothes/longsleeve_dio_holy_diver_hb_l2.JPG",
"img/clothes/longsleeve_dio_holy_diver_hb_l3.JPG",
"img/clothes/longsleeve_dio_holy_diver_hb_l4.JPG",
"img/clothes/longsleeve_dio_holy_diver_hb_l5.JPG",
"img/clothes/longsleeve_dio_holy_diver_hb_l6.JPG",
"img/clothes/longsleeve_dio_holy_diver_hb_l7.JPG",
"img/clothes/longsleeve_dio_holy_diver_hb_l9.JPG",
"img/clothes/longsleeve_entombed_left_hand_path_hb_l.JPG",
"img/clothes/longsleeve_entombed_left_hand_path_hb_l10.JPG",
"img/clothes/longsleeve_entombed_left_hand_path_hb_l11.JPG",
"img/clothes/longsleeve_entombed_left_hand_path_hb_l12.JPG",
"img/clothes/longsleeve_entombed_left_hand_path_hb_l2.JPG",
"img/clothes/longsleeve_entombed_left_hand_path_hb_l3.JPG",
"img/clothes/longsleeve_entombed_left_hand_path_hb_l5.JPG",
"img/clothes/longsleeve_entombed_left_hand_path_hb_l7.JPG",
"img/clothes/longsleeve_entombed_left_hand_path_hb_l9.JPG",]



export async function testDb(){
	// for (let i = 0; i < 30; i++) {
		await seedDb()
	// }
}



async function seedDb(){
	// const selectedCategory = categoryIds[randomDecimalNumber(0, categoryIds.length - 2)]
	// const selectedBand = bandIds[randomDecimalNumber(0, categoryIds.length - 2)]
	const prisma = new PrismaClient();

	// const opd = await prisma.shoppingCard.updateMany({data:
	// 	{
	// 		colors:color,
	// 		sizes:["x", "l", "m", "xl","xxl"]
	// 	}
	// })
	// const cate = await prisma.category.findFirst({where:{id: selectedCategory}, select:{
	// 	id: true,
	// 	slug: true
	// }})

	// const ba = await prisma.band.findFirst({where:{id: selectedBand}, select:{
	// 	id: true,
	// 	name: true
	// }})

	// const seed = await prisma.shoppingCard.create(
	// 	{
	// 	data:{
	// 			name: 'Товар',
	// 			slug:slug('Товар'),
	// 			colors:getRandomArray(color),
	// 			sizes:getRandomArray(sizes),
	// 			categoryId: cate?.id as string,
	// 			categorySlug: cate?.slug as string,
	// 			bandId: ba?.id as string,
	// 			bandName: ba?.name as string,
	// 			isInStock: true,
	// 			articleNumber:randomDecimalNumberToString(1, 9999999),
	// 			// bandId:bandIds[randomDecimalNumber(0, bandIds.length - 2)],
	// 			description: 'sdf2wo45lwkgepk	twkg]wpkghoju6y765gijh',
	// 			material:'Хлопок 100%',
	// 			specifications: 'asdf3wh3q y3qhygthf h35 uwqa jtjretj fghfsghfsgh',
	// 			price: randomDecimalNumber(1000,7000),
	// 			images: {
	// 				"white": get4RandomStrings(imagesClothes),
	// 				"black": get4RandomStrings(imagesClothes),
	// 				"blue": get4RandomStrings(imagesClothes),
	// 				"red": get4RandomStrings(imagesClothes),
	// 				"green": get4RandomStrings(imagesClothes),
	// 				"yellow": get4RandomStrings(imagesClothes),
	// 			},
	// 			details:{
	// 				"white": {
	// 					x:randomDecimalNumber(0,10),
	// 					l:randomDecimalNumber(0,10),
	// 					m:randomDecimalNumber(0,10),
	// 					xl:randomDecimalNumber(0,10),
	// 					xxl: randomDecimalNumber(0,10),
	// 				},
	// 				"black": {
	// 					x:randomDecimalNumber(0,10),
	// 					l:randomDecimalNumber(0,10),
	// 					m:randomDecimalNumber(0,10),
	// 					xl:randomDecimalNumber(0,10),
	// 					xxl: randomDecimalNumber(0,10),
	// 				},
	// 				"blue": {
	// 					x:randomDecimalNumber(0,10),
	// 					l:randomDecimalNumber(0,10),
	// 					m:randomDecimalNumber(0,10),
	// 					xl:randomDecimalNumber(0,10),
	// 					xxl: randomDecimalNumber(0,10),
	// 				},
	// 				"red": {
	// 					x:randomDecimalNumber(0,10),
	// 					l:randomDecimalNumber(0,10),
	// 					m:randomDecimalNumber(0,10),
	// 					xl:randomDecimalNumber(0,10),
	// 					xxl: randomDecimalNumber(0,10),
	// 				},
	// 				"green": {
	// 					x:randomDecimalNumber(0,10),
	// 					l:randomDecimalNumber(0,10),
	// 					m:randomDecimalNumber(0,10),
	// 					xl:randomDecimalNumber(0,10),
	// 					xxl: randomDecimalNumber(0,10),
	// 				},
	// 				"yellow": {
	// 					x:randomDecimalNumber(0,10),
	// 					l:randomDecimalNumber(0,10),
	// 					m:randomDecimalNumber(0,10),
	// 					xl:randomDecimalNumber(0,10),
	// 					xxl: randomDecimalNumber(0,10),
	// 				},
	// 			},
	// 	},

	// })



	const categoriesSeed = await prisma.category.createMany({
		data:[
			{
				name: 'Футболки',
				slug: slug('футболки')
			},
			{
				name: 'Лонгсливы',
				slug: slug('Лонгсливы')
			},
			{
				name: 'Флаги',
				slug: slug('Флаги')
			},
			{
				name: 'Нашивки',
				slug: slug('Нашивки')
			},
		]
	})

	// const bandsSeed = await prisma.band.createMany({
	// 	data:[
	// 		{
	// 			name: 'Nirvana',
	// 			slug: slug('Nirvana')
	// 		},
	// 		{
	// 			name: 'AC/DC',
	// 			slug: slug('AC/DC')
	// 		},
	// 		{
	// 			name: 'Metallica',
	// 			slug: slug('Metallica')
	// 		},
	// 		{
	// 			name: 'Joy Division',
	// 			slug: slug('Joy Division')
	// 		},
	// 	]
	// })
}







// const testFolder = './public/img/clothes';
// const fs = require('fs');

// fs.readdirSync(testFolder).forEach(file => {
// console.log(`"img/clothes/${file}",`);
// });

