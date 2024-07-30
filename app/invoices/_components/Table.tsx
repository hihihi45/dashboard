import Image from 'next/image';
import { DeleteInvoice, UpdateInvoice } from '@/components/Buttons';
import InvoiceStatus from './Status';
import { formatPrice } from '@/lib/formatPrice';
import { formatDate } from '@/lib/formatDate';
import { getFilteredInvoices } from '@/hooks/getFilteredInvoices';
import { InvoiceWithCustomer } from '@/types';
import { auth } from '@clerk/nextjs/server';

export default async function InvoicesTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const { userId: clerkUserId } = auth();
	const invoices: InvoiceWithCustomer[] = await getFilteredInvoices(
		query,
		currentPage,
		clerkUserId || ''
	);

	return (
		<div className='flow-root w-full'>
			<div className='inline-block min-w-full align-middle'>
				<div className='rounded-lg bg-sky-100 p-2 md:pt-0'>
					<div className='md:hidden'>
						{invoices?.map(invoice => (
							<div
								key={invoice.id}
								className='mb-2 w-full rounded-md bg-white p-4'
							>
								<div className='flex items-center justify-between border-b pb-4'>
									<div>
										<div className='mb-2 flex items-center'>
											<Image
												src={invoice.customer.imageUrl}
												className='mr-2 rounded-full'
												width={28}
												height={28}
												alt={`${invoice.customer.name}'s profile picture`}
											/>
											<p>{invoice.customer.name}</p>
										</div>
										<p className='text-sm text-sky-1000'>
											{invoice.customer.email}
										</p>
									</div>
									<InvoiceStatus status={invoice.status} />
								</div>
								<div className='flex w-full items-center justify-between pt-4'>
									<div>
										<p className='text-xl font-medium'>
											{formatPrice(invoice.amount)}
										</p>
										<p>{formatDate(invoice.date.toString())}</p>
									</div>
									<div className='flex justify-end gap-2'>
										<UpdateInvoice id={invoice.id} />
										<DeleteInvoice
											id={invoice.id}
											clerkUserId={clerkUserId || ''}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
					<table className='hidden min-w-full text-gray-900 md:table'>
						<thead className='rounded-lg text-left text-sm font-normal'>
							<tr>
								<th
									scope='col'
									className='px-4 py-5 font-medium sm:pl-6'
								>
									Customer
								</th>
								<th
									scope='col'
									className='px-3 py-5 font-medium hidden lg:table-cell'
								>
									Email
								</th>
								<th
									scope='col'
									className='px-3 py-5 font-medium'
								>
									Amount
								</th>
								<th
									scope='col'
									className='px-3 py-5 font-medium'
								>
									Date
								</th>
								<th
									scope='col'
									className='px-3 py-5 font-medium'
								>
									Status
								</th>
								<th
									scope='col'
									className='relative py-3 pl-6 pr-3'
								>
									<span className='sr-only'>Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className='bg-white'>
							{invoices?.map(invoice => (
								<tr
									key={invoice.id}
									className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
								>
									<td className='whitespace-nowrap py-3 pl-6 pr-3'>
										<div className='flex items-center gap-3'>
											<Image
												src={invoice.customer.imageUrl}
												className='rounded-full md:hidden lg:block'
												width={28}
												height={28}
												alt={`${invoice.customer.name}'s profile picture`}
											/>
											<p className='truncate'>{invoice.customer.name}</p>
										</div>
									</td>
									<td className='whitespace-nowrap px-3 py-3 hidden lg:table-cell truncate'>
										{invoice.customer.email}
									</td>
									<td className='whitespace-nowrap px-3 py-3 truncate'>
										{formatPrice(invoice.amount)}
									</td>
									<td className='whitespace-nowrap px-3 py-3 truncate'>
										{formatDate(invoice.date.toString())}
									</td>
									<td className='whitespace-nowrap px-3 py-3 truncate'>
										<InvoiceStatus status={invoice.status} />
									</td>
									<td className='whitespace-nowrap py-3 pl-3 pr-3'>
										<div className='flex justify-end gap-3'>
											<UpdateInvoice id={invoice.id} />
											<DeleteInvoice
												id={invoice.id}
												clerkUserId={clerkUserId || ''}
											/>{' '}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
