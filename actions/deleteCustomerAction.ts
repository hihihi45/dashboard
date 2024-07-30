'use server';

import { deleteCustomer } from '@/hooks/deleteCustomer';

export async function deleteCustomerAction(id: string, clerkUserId: string) {
	const deleteCustomerWithId = await deleteCustomer(id, clerkUserId);

	return deleteCustomerWithId;
}
