import prisma from '@/lib/prisma';
import { EditInvoiceFormData } from '@/types';
import { InvoiceStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function editInvoice(
	formData: EditInvoiceFormData,
	clerkUserId: string
) {
	const { customerId, id, amount, status, date } = formData;

	try {
		const invoice = await prisma.invoice.update({
			where: {
				id: id as string,
				clerkUserId: clerkUserId as string,
			},
			data: {
				customerId: customerId as string,
				amount: amount as number,
				status: status as InvoiceStatus,
				date: date as Date,
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
