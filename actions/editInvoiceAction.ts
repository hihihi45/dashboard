'use server';

import { editInvoice } from '@/hooks/editInvoice';
import { EditInvoiceFormData } from '@/types';
import { redirect } from 'next/navigation';

export async function editInvoiceAction(
	formData: EditInvoiceFormData,
	clerkUserId: string
) {
	await editInvoice(formData, clerkUserId);
	redirect('/invoices');
}
