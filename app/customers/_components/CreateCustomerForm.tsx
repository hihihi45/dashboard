'use client';

import CustomFormField from '@/components/CustomFormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createCustomerAction } from '@/actions/createCustomerAction';

interface CreateCustomerFormProps {
	clerkUserId: string;
}

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	email: z.string().email({ message: 'Invalid email address.' }),
	imageUrl: z.string().min(2, { message: 'Invalid image URL.' }),
});

export function CreateCustomerForm({ clerkUserId }: CreateCustomerFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			imageUrl: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		createCustomerAction({ ...values, clerkUserId });
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
						<CustomFormField
							form={form}
							name='imageUrl'
							label='Image'
							type='file'
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
