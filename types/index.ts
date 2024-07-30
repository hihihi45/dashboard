import { InvoiceStatus } from '@prisma/client';

export interface InvoiceWithCustomer {
	id: string;
	customerId: string;
	amount: number;
	date: Date;
	status: 'pending' | 'paid';
	customer: {
		name: string;
		email: string;
	};
}

export interface CustomersWithStatus {
	id: string;
	name: string;
	email: string;
	image_url: string;
	total_invoices: number;
	total_pending: number;
	total_paid: number;
}

export interface CreateCustomerFormData {
	name: string;
	email: string;
	clerkUserId: string;
}

export interface CreateInvoiceFormData {
	customerId: string;
	amount: number;
	status: 'paid' | 'pending' | InvoiceStatus;
	date: Date;
	clerkUserId: string;
}

export interface EditInvoiceFormData {
	id: string;
	customerId: string;
	amount: number;
	status: 'paid' | 'pending' | InvoiceStatus;
	date: Date;
}

export interface Customer {
	id: string;
	name: string;
	email: string;
}
