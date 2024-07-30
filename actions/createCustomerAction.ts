'use server';

import { createCustomer } from '@/hooks/createCustomer';
import { CreateCustomerFormData } from '@/types';
import { redirect } from 'next/navigation';

export async function createCustomerAction(formData: CreateCustomerFormData) {
	await createCustomer(formData);
	redirect('/customers');
}
