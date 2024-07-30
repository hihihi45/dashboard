import prisma from '@/lib/prisma';
import { InvoiceWithCustomer } from '@/types';
import { Prisma } from '@prisma/client';

const ITEMS_PER_PAGE = 8;

export async function getFilteredInvoices(
	query: string,
	currentPage: number,
	clerkUserId: string
): Promise<InvoiceWithCustomer[]> {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const whereConditions: Prisma.InvoiceWhereInput = {
			OR: [] as Prisma.InvoiceWhereInput[],
		};

		if (!whereConditions || !whereConditions.OR) {
			return [];
		}
		whereConditions.OR.push({
			customer: {
				OR: [
					{ name: { contains: query, mode: 'insensitive' } },
					{ email: { contains: query, mode: 'insensitive' } },
				],
			},
		});

		const parsedAmount = parseFloat(query);
		if (!isNaN(parsedAmount)) {
			whereConditions.OR.push({ amount: { equals: parsedAmount } });
		}

		const parsedDate = new Date(query);
		if (!isNaN(parsedDate.getTime())) {
			whereConditions.OR.push({ date: { equals: parsedDate } });
		}

		if (query.toLowerCase() === 'pending' || query.toLowerCase() === 'paid') {
			whereConditions.OR.push({
				status: { equals: query.toLowerCase() as 'pending' | 'paid' },
			});
		}

		const invoices = await prisma.invoice.findMany({
			include: {
				customer: {
					select: {
						name: true,
						email: true,
						imageUrl: true,
					},
				},
			},
			where: {
				...whereConditions,
				clerkUserId: clerkUserId as string,
			},
			orderBy: {
				date: 'desc',
			},
			take: ITEMS_PER_PAGE,
			skip: offset,
		});

		return invoices;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch invoices.');
	}
}
