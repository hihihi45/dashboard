import prisma from '@/lib/prisma';
import { CreateInvoiceFormData } from '@/types';
import { InvoiceStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createInvoice(formData: CreateInvoiceFormData) {
	const { customerId, amount, status, date, clerkUserId } = formData;

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

		const invoice = await prisma.invoice.create({
			data: {
				customerId: customerId as string,
				amount: amount as number,
				status: status as InvoiceStatus,
				date: date as Date,
				clerkUserId: clerkUserId as string,
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
