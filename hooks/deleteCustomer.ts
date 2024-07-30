import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteCustomer(id: string, clerkUserId: string) {
	try {
		const user = await prisma.user.findUnique({
			where: { clerkUserId: clerkUserId },
		});

		if (!user) {
			return {
				message: 'Database Error: Failed to delete customer.',
			};
		}

		await prisma.customer.delete({ where: { id, clerkUserId } });
	} catch (error) {
		return {
			message: 'Database Error: Failed to delete customer.',
		};
	}
	revalidatePath('/customers');
}
