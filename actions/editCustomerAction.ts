'use server';

import { editCustomer } from '@/hooks/editCustomer';
import { Customer } from '@/types';
import { redirect } from 'next/navigation';

export async function editCustomerAction(
	formData: Customer,
	clerkUserId: string
) {
	await editCustomer(formData, clerkUserId);
	redirect('/customers');
}
