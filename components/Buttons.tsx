import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoiceAction } from '@/actions/deleteInvoiceAction';
import { deleteCustomerAction } from '@/actions/deleteCustomerAction';
import { SignInButton } from '@clerk/nextjs';
import { Button } from './ui/button';

interface ButtonProps {
	clerkUserId: string | '';
}

export function CreateInvoice({ clerkUserId }: ButtonProps) {
	return (
		<>
			{clerkUserId ? (
				<>
					<Link
						href='/invoices/create'
						className='flex h-10 items-center rounded-lg bg-sky-100 sm:bg-transparent px-4 text-sm font-medium text-white hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all'
					>
						<span className='hidden sm:block truncate'>Create Invoice</span>{' '}
						<PlusIcon className='h-5 ml-0 sm:ml-4' />
					</Link>
				</>
			) : (
				<SignInButton mode='modal'>
					<Button>
						<span className='hidden md:block truncate'>Create Invoice</span>{' '}
						<PlusIcon className='h-5 ml-0 sm:ml-4' />
					</Button>
				</SignInButton>
			)}
		</>
	);
}

export function CreateCustomer({ clerkUserId }: ButtonProps) {
	return (
		<>
			{clerkUserId ? (
				<Link
					href='/customers/create'
					className='flex h-10 items-center bg-sky-100 sm:bg-transparent rounded-lg  px-4 text-sm font-medium text-white hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all'
				>
					<span className='hidden sm:block truncate'>Create Customer</span>{' '}
					<PlusIcon className='h-5 ml-0 sm:ml-4' />
				</Link>
			) : (
				<SignInButton mode='modal'>
					<Button>
						<span className='hidden sm:block truncate'>Create Customer</span>{' '}
						<PlusIcon className='h-5 ml-0 sm:ml-4' />
					</Button>
				</SignInButton>
			)}
		</>
	);
}

export function UpdateInvoice({ id }: { id: string }) {
	return (
		<Link
			href={`/invoices/${id}/edit`}
			className='rounded-md border p-2 hover:bg-gray-100 transition-all'
		>
			<PencilIcon className='w-4 lg:w-5' />
		</Link>
	);
}

export function UpdateCustomer({ id }: { id: string }) {
	return (
		<Link
			href={`/customers/${id}/edit`}
			className='rounded-md border p-2 hover:bg-gray-100 transition-all'
		>
			<PencilIcon className='w-4 lg:w-5' />
		</Link>
	);
}

export function DeleteInvoice({
	id,
	clerkUserId,
}: {
	id: string;
	clerkUserId: string;
}) {
	return (
		<form action={deleteInvoiceAction.bind(null, id, clerkUserId)}>
			<button className='rounded-md border p-2 hover:bg-gray-100 transition-all'>
				<span className='sr-only'>Delete</span>
				<TrashIcon className='w-4 lg:w-5' />
			</button>
		</form>
	);
}

export function DeleteCustomer({
	id,
	clerkUserId,
}: {
	id: string;
	clerkUserId: string;
}) {
	return (
		<form action={deleteCustomerAction.bind(null, id, clerkUserId)}>
			<button className='rounded-md border p-2 hover:bg-gray-100 transition-all'>
				<span className='sr-only'>Delete</span>
				<TrashIcon className='w-4 lg:w-5' />
			</button>
		</form>
	);
}
