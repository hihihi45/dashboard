import prisma from '@/lib/prisma';

const ITEMS_PER_PAGE = 8;

export async function getCustomersPages(query: string) {
	const count = await prisma.customer.count({
		where: {
			OR: [
				{ name: { contains: query, mode: 'insensitive' } },
				{ email: { contains: query, mode: 'insensitive' } },
			],
		},
	});

	const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

	return { totalPages };
}
