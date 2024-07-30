import prisma from '@/lib/prisma';

export async function getInvoices(clerkUserId: string) {
	const invoices = await prisma.invoice.findMany({
		where: {
			clerkUserId: clerkUserId as string,
		},
	});
	return invoices;
}
