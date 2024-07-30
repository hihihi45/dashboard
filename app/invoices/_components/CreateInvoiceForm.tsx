'use client';

import CustomFormField from '@/components/CustomFormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createInvoiceAction } from '@/actions/createInvoiceAction';
import { Customer, InvoiceStatus } from '@prisma/client';

interface CreateInvoiceFormProps {
	customers: Customer[];
	clerkUserId: string;
}

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

export function CreateInvoiceForm({
	customers,
	clerkUserId,
}: CreateInvoiceFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			customerId: '',
			amount: 0,
			status: InvoiceStatus.pending,
			date: new Date(),
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		createInvoiceAction({ ...values, clerkUserId });
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
