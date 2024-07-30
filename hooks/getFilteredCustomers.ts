import prisma from '@/lib/prisma';

const ITEMS_PER_PAGE = 8;

export async function getFilteredCustomers(
	query: string,
	currentPage: number,
	clerkUserId: string
) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const customers = await prisma.customer.findMany({
			where: {
				clerkUserId: clerkUserId as string,
				OR: [
					{ name: { contains: query, mode: 'insensitive' } },
					{ email: { contains: query, mode: 'insensitive' } },
				],
			},
			select: {
				id: true,
				name: true,
				email: true,
				invoices: {
					select: {
						amount: true,
						status: true,
					},
				},
			},
			orderBy: {
				name: 'asc',
			},
			take: ITEMS_PER_PAGE,
			skip: offset,
		});

		const formattedCustomers = customers.map(customer => {
			const totalInvoices = customer.invoices.length;
			const totalPending = customer.invoices
				.filter(invoice => invoice.status === 'pending')
				.reduce((sum, invoice) => sum + invoice.amount, 0);
			const totalPaid = customer.invoices
				.filter(invoice => invoice.status === 'paid')
				.reduce((sum, invoice) => sum + invoice.amount, 0);

			return {
				id: customer.id,
				name: customer.name,
				email: customer.email,
				total_invoices: totalInvoices,
				total_pending: totalPending,
				total_paid: totalPaid,
			};
		});

		return formattedCustomers;
	} catch (err) {
		console.error('Database Error:', err);
		throw new Error('Failed to fetch customer table.');
	}
}
