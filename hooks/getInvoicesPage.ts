import { InvoiceStatus, Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

const ITEMS_PER_PAGE = 8;

type InvoiceSearchCondition =
	| { customer: { name: { contains: string; mode: 'insensitive' } } }
	| { customer: { email: { contains: string; mode: 'insensitive' } } }
	| { amount: { equals: number | undefined } }
	| { date: { equals: Date | undefined } }
	| { status: { equals: InvoiceStatus | undefined } };

export async function getInvoicesPages(query: string, clerkUserId: string) {
	try {
		const orConditions: InvoiceSearchCondition[] = [
			{ customer: { name: { contains: query, mode: 'insensitive' } } },
			{ customer: { email: { contains: query, mode: 'insensitive' } } },
			{
				amount: {
					equals: isNaN(parseFloat(query)) ? undefined : parseFloat(query),
				},
			},
			{
				date: {
					equals: isNaN(Date.parse(query)) ? undefined : new Date(query),
				},
			},
			{
				status: {
					equals: ['pending', 'paid'].includes(query.toLowerCase())
						? (query.toLowerCase() as InvoiceStatus)
						: undefined,
				},
			},
		];

		const filteredConditions = orConditions.filter(
			condition => Object.values(condition)[0]?.equals !== undefined
		);

		const whereClause: Prisma.InvoiceWhereInput = {
			AND: [{ OR: filteredConditions }, { clerkUserId: clerkUserId }],
		};

		const count = await prisma.invoice.count({
			where: whereClause,
		});

		const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch total number of invoices.');
	}
}
