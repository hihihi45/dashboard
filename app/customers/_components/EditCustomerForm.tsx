'use client';

import CustomFormField from '@/components/CustomFormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Customer } from '@prisma/client';
import { editCustomerAction } from '@/actions/editCustomerAction';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	email: z.string().email({ message: 'Invalid email address.' }),
	imageUrl: z.string().min(2, { message: 'Invalid image URL.' }),
});

interface EditCustomerFormProps {
	customer: Customer;
	id: string;
	clerkUserId?: string | null;
}

export function EditCustomerForm({
	customer,
	id,
	clerkUserId,
}: EditCustomerFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: customer.name,
			email: customer.email,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		editCustomerAction({ ...values, id }, clerkUserId || '');
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
							name='name'
							label='Name'
							type='text'
						/>
						<CustomFormField
							form={form}
							name='email'
							label='Email'
							type='text'
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
