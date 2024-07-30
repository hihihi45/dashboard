'use server';

import { getInvoices } from '@/hooks/getInvoices';

export async function getRevenueAction(clerkUserId: string) {
	const revenue = await getInvoices(clerkUserId);

	return revenue;
}
