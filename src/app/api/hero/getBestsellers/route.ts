import { prisma } from '@/shared/api/prismaInstance'
import { gResponse } from '@/shared/utils/common'

export async function GET(req: Request) {
	try {
		const bestsellers = await prisma.shoppingCard.findMany({
			where:{
				isBestseller: true
			}
		});
		return new Response(JSON.stringify(gResponse(bestsellers, null)), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch(e){
		return new Response(JSON.stringify(gResponse(null, e as string)), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
