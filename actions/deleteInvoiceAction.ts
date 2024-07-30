'use server';

import { deleteInvoice } from '@/hooks/deleteInvoice';

export async function deleteInvoiceAction(id: string, clerkUserId: string) {
	const deleteInvoiceWithId = await deleteInvoice(id, clerkUserId);

	return deleteInvoiceWithId;
}
