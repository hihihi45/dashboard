import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteInvoice(id: string, clerkUserId: string) {
	try {
		const user = await prisma.user.findUnique({
			where: { clerkUserId: clerkUserId },
		})

		if (!user) {
			return {
				message: 'Database Error: Failed to delete invoice.',
			}
		}

		await prisma.invoice.delete({ where: { id, clerkUserId } });
	} catch (error) {
		return {
			message: 'Database Error: Failed to delete invoice.',
		};
	}
	revalidatePath('/invoices');
}
