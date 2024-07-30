import Image from 'next/image';
import { getFilteredCustomers } from '@/hooks/getFilteredCustomers';
import { CustomersWithStatus } from '@/types';
import { DeleteCustomer, UpdateCustomer } from '@/components/Buttons';
import { formatPrice } from '@/lib/formatPrice';
import { auth } from '@clerk/nextjs/server';

export default async function CustomersTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const { userId: clerkUserId } = auth();
	const customers: CustomersWithStatus[] = await getFilteredCustomers(
		query,
		currentPage,
		clerkUserId || ''
	);

	return (
		<div className='flow-root w-full'>
			<div className='inline-block min-w-full align-middle'>
				<div className='rounded-lg bg-sky-100 p-2 md:pt-0'>
					{/* Conditional rendering for empty customer list */}
					{customers.length === 0 ? (
						<div className='flex flex-col items-center justify-center py-12 px-4'>
							<p className='mt-4 text-lg font-medium text-gray-600'>
								No invoices available
							</p>
							<p className='mt-2 text-sm text-gray-500 text-center'>
								When you create invoices, they'll appear here.
							</p>
						</div>
					) : (
						<>
							{/* Mobile view */}
							<div className='md:hidden'>
								{customers.map(customer => (
									<div
										key={customer.id}
										className='mb-2 w-full rounded-md bg-white p-4'
									>
										<div className='flex items-center justify-between border-b pb-4'>
											<div>
												<div className='mb-2 flex items-center'>
													<Image
														src={customer.image_url}
														className='mr-2 rounded-full'
														width={28}
														height={28}
														alt={`${customer.name}'s profile picture`}
													/>
													<p>{customer.name}</p>
												</div>
												<p className='text-sm text-sky-1000'>
													{customer.email}
												</p>
											</div>
										</div>
										<div className='flex w-full items-center justify-between pt-4'>
											<div>
												<p className='text-xl font-medium'>
													{customer.total_invoices} invoices
												</p>
												<p>Pending: {customer.total_pending}</p>
												<p>Paid: {customer.total_paid}</p>
											</div>
											<div className='flex justify-end gap-2'>
												<UpdateCustomer id={customer.id} />
												<DeleteCustomer
													id={customer.id}
													clerkUserId={clerkUserId || ''}
												/>
											</div>
										</div>
									</div>
								))}
							</div>

							{/* Desktop view */}
							<table className='hidden min-w-full text-gray-900 md:table'>
								<thead className='rounded-lg text-left text-sm font-normal'>
									<tr>
										<th
											scope='col'
											className='px-4 py-5 font-medium sm:pl-6'
										>
											Name
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
											Total Invoices
										</th>
										<th
											scope='col'
											className='px-3 py-5 font-medium'
										>
											Total Pending
										</th>
										<th
											scope='col'
											className='px-3 py-5 font-medium'
										>
											Total Paid
										</th>
										<th
											scope='col'
											className='relative py-3 pl-6 pr-3'
										>
											<span className='sr-only'>Actions</span>
										</th>
									</tr>
								</thead>
								<tbody className='bg-white'>
									{customers.map(customer => (
										<tr
											key={customer.id}
											className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
										>
											<td className='whitespace-nowrap py-3 pl-6 pr-3'>
												<div className='flex items-center gap-3'>
													<Image
														src={customer.image_url}
														className='rounded-full hidden lg:block'
														width={28}
														height={28}
														alt={`${customer.name}'s profile picture`}
													/>
													<p className='truncate'>{customer.name}</p>
												</div>
											</td>
											<td className='whitespace-nowrap truncate px-3 py-3 hidden lg:table-cell'>
												{customer.email}
											</td>
											<td className='whitespace-nowrap px-3 py-3 truncate'>
												{customer.total_invoices}
											</td>
											<td className='whitespace-nowrap px-3 py-3 truncate'>
												{formatPrice(customer.total_pending)}
											</td>
											<td className='whitespace-nowrap px-3 py-3 truncate'>
												{formatPrice(customer.total_paid)}
											</td>
											<td className='whitespace-nowrap py-3 pl-3 pr-3'>
												<div className='flex justify-end gap-3'>
													<UpdateCustomer id={customer.id} />
													<DeleteCustomer
														id={customer.id}
														clerkUserId={clerkUserId || ''}
													/>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
