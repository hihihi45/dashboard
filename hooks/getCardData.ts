import prisma from '@/lib/prisma';

export async function getCardData(clerkUserId: string) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				clerkUserId,
			},
		});
		if (!user) {
			return null;
		}

		const [invoiceCountTotal, customerCountTotal, invoiceStatusTotal] =
			await Promise.all([
				prisma.invoice.count({
					where: {
						clerkUserId,
					},
				}),
				prisma.customer.count({
					where: {
						clerkUserId,
					},
				}),
				prisma.invoice.groupBy({
					by: ['status'],
					_sum: {
						amount: true,
					},
					where: {
						clerkUserId,
						status: {
							in: ['pending', 'paid'],
						},
					},
				}),
			]);

		const numberOfInvoices = invoiceCountTotal || 0;
		const numberOfCustomers = customerCountTotal || 0;
		const totalPaidInvoices =
			invoiceStatusTotal.find(invoice => invoice.status === 'paid')?._sum
				?.amount || 0;
		const totalPendingInvoices =
			invoiceStatusTotal.find(invoice => invoice.status === 'pending')?._sum
				?.amount || 0;

		return {
			numberOfCustomers,
			numberOfInvoices,
			totalPaidInvoices,
			totalPendingInvoices,
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
}
