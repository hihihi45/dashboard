import prisma from '@/lib/prisma';

export async function getRevenue() {
	try {
		const revenue = await prisma.revenue.findMany();

		if (!revenue) {
			return null;
		}

		return revenue;
	} catch (error: any) {
		throw new Error(error);
	}
}
