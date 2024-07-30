'use server';

import { createInvoice } from '@/hooks/createInvoice';
import { CreateInvoiceFormData } from '@/types';
import { redirect } from 'next/navigation';

export async function createInvoiceAction(formData: CreateInvoiceFormData) {
	await createInvoice(formData);
	redirect('/invoices');
}
