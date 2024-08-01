import { formatPrice } from '@/lib/formatPrice';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getLatestInvoices(clerkUserId: string) {
	try {
		const data = await prisma.invoice.findMany({
			where: {
				clerkUserId: clerkUserId as string,
			},
			take: 9,
			orderBy: {
				date: 'desc',
			},
			include: {
				customer: {
					select: {
						name: true,
						email: true,
					},
				},
			},
		});

		const latestInvoices = data.map(invoice => ({
			id: invoice.id,
			amount: formatPrice(invoice.amount),
			name: invoice.customer.name,
			email: invoice.customer.email,
			date: invoice.date,
		}));
		revalidatePath('/');

		return latestInvoices;
	} catch (error: any) {
		throw new Error(error);
	}
}
