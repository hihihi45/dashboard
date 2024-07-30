import prisma from '@/lib/prisma';
import { CreateCustomerFormData } from '@/types';
import { revalidatePath } from 'next/cache';

export async function createCustomer(formData: CreateCustomerFormData) {
	const { name, email, clerkUserId } = formData;

	try {
		let user = await prisma.user.findUnique({
			where: { clerkUserId: clerkUserId as string },
		});

		if (!user) {
			user = await prisma.user.create({
				data: {
					clerkUserId: clerkUserId as string,
				},
			});
		}

		const customer = await prisma.customer.create({
			data: {
				name: name as string,
				email: email as string,
				clerkUserId: clerkUserId as string,
			},
		});

		if (!customer) {
			return null;
		}

		revalidatePath('/customers');

		return customer;
	} catch (error: any) {
		throw new Error(error);
	}
}
