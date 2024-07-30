'use client';

import CustomFormField from '@/components/CustomFormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Customer, Invoice, InvoiceStatus } from '@prisma/client';
import { editInvoiceAction } from '@/actions/editInvoiceAction';

const formSchema = z.object({
	customerId: z.string().min(2, {
		message: 'You need to select a customer.',
	}),
	amount: z.coerce
		.number()
		.min(1, { message: 'Amount needs to be greater than 0.' }),
	status: z.enum([InvoiceStatus.pending, InvoiceStatus.paid]),
	date: z.coerce.date({ required_error: 'Please select a date.' }),
});

interface EditInvoiceFormProps {
	customers: Customer[];
	invoice: Invoice;
	id: string;
	clerkUserId?: string;
}

export function EditInvoiceForm({
	customers,
	invoice,
	id,
	clerkUserId,
}: EditInvoiceFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			customerId: invoice.customerId,
			amount: invoice.amount,
			status: invoice.status,
			//@ts-ignore
			date: new Date(invoice.date).toISOString().split('T')[0],
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		editInvoiceAction({ ...values, id }, clerkUserId || '');
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'
			>
				<div className='rounded-md bg-sky-100 p-4 md:p-6'>
					<div className=' rounded-md'>
						<CustomFormField
							form={form}
							name='customerId'
							label='Customer'
							type='text'
							customers={customers}
						/>
						<CustomFormField
							form={form}
							name='amount'
							label='Amount (£)'
							type='text'
						/>
						<CustomFormField
							form={form}
							name='status'
							label='Status'
						/>
						<CustomFormField
							form={form}
							name='date'
							label='Date'
							type='date'
						/>
						<Button
							className='mt-6 transition-all bg-white'
							type='submit'
						>
							Submit
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
