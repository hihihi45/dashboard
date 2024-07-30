import prisma from '@/lib/prisma';
import { Customer } from '@/types';
import { revalidatePath } from 'next/cache';

export async function editCustomer(formData: Customer, clerkUserId: string) {
	const { id, name, email, imageUrl } = formData;

	try {
		const invoice = await prisma.customer.update({
			where: {
				id: id as string,
				clerkUserId: clerkUserId as string,
			},
			data: {
				name: name as string,
				email: email as string,
				imageUrl: imageUrl as string,
			},
		});

		if (!invoice) {
			return null;
		}
		revalidatePath('/invoices');

		return invoice;
	} catch (error: any) {
		throw new Error(error);
	}
}
