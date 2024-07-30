import prisma from '@/lib/prisma';

export async function getCustomers(clerkUserId: string) {
	const customers = await prisma.customer.findMany({
		where: {
			clerkUserId: clerkUserId as string,
		},
	});
	return customers;
}
