import prisma from '@/lib/prisma';

export async function calculateRevenue(newInvoiceId: string) {
	try {
		const newInvoice = await prisma.invoice.findUnique({
			where: { id: newInvoiceId },
			select: { date: true, amount: true },
		});

		if (!newInvoice) {
			throw new Error('New invoice not found');
		}

		const invoiceDate = new Date(newInvoice.date);
		invoiceDate.setHours(0, 0, 0, 0);

		const weekStart = new Date(invoiceDate);
		weekStart.setDate(invoiceDate.getDate() - invoiceDate.getDay());
		const monthStart = new Date(
			invoiceDate.getFullYear(),
			invoiceDate.getMonth(),
			1
		);
		const yearStart = new Date(invoiceDate.getFullYear(), 0, 1);

		const revenues = await prisma.invoice.groupBy({
			by: ['date'],
			_sum: { amount: true },
			where: {
				date: {
					gte: yearStart,
					lt: new Date(invoiceDate.getTime() + 24 * 60 * 60 * 1000),
				},
			},
		});

		const dailyRevenue =
			revenues.find(r => r.date.getTime() === invoiceDate.getTime())?._sum
				.amount || 0;
		const weeklyRevenue = revenues
			.filter(r => r.date >= weekStart)
			.reduce((sum, r) => sum + (r._sum.amount || 0), 0);
		const monthlyRevenue = revenues
			.filter(r => r.date >= monthStart)
			.reduce((sum, r) => sum + (r._sum.amount || 0), 0);
		const yearlyRevenue = revenues.reduce(
			(sum, r) => sum + (r._sum.amount || 0),
			0
		);

		await prisma.$transaction([
			prisma.revenue.upsert({
				where: { date: invoiceDate },
				update: { revenue: dailyRevenue },
				create: { date: invoiceDate, revenue: dailyRevenue, period: 'DAILY' },
			}),
			prisma.revenue.upsert({
				where: { date: weekStart },
				update: { revenue: weeklyRevenue },
				create: { date: weekStart, revenue: weeklyRevenue, period: 'WEEKLY' },
			}),
			prisma.revenue.upsert({
				where: { date: monthStart },
				update: { revenue: monthlyRevenue },
				create: {
					date: monthStart,
					revenue: monthlyRevenue,
					period: 'MONTHLY',
				},
			}),
			prisma.revenue.upsert({
				where: { date: yearStart },
				update: { revenue: yearlyRevenue },
				create: { date: yearStart, revenue: yearlyRevenue, period: 'YEARLY' },
			}),
		]);
	} catch (error) {
		throw error;
	}
}
