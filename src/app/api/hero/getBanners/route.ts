import { prisma } from '@/shared/api/prismaInstance'
import { gResponse } from '@/shared/utils/common'

export async function GET(req: Request) {
	try {
		const banners = await prisma.banner.findMany();
		return new Response(JSON.stringify(gResponse(banners, null)), {
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
