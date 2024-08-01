import clsx from 'clsx';
import Image from 'next/image';
import { getLatestInvoices } from '@/hooks/getLatestInvoices';
import InboxIcon from '@heroicons/react/24/outline/InboxIcon';
import { auth } from '@clerk/nextjs/server';
import CustomerAvatar from '@/components/CustomerAvatar';

export default async function LatestInvoices() {
	const { userId: clerkUserId } = auth();
	const latestInvoices = await getLatestInvoices(clerkUserId || '');

	return (
		<div className='flex w-full h-full flex-col md:col-span-4'>
			<div className='flex flex-col w-full bg-sky-100 h-full p-2 rounded-lg'>
				<div className='flex items-center mb-2'>
					<InboxIcon className='h-5 w-5 text-gray-700' />
					<h3 className='ml-2 truncate'>Latest Invoices</h3>
				</div>

				<div className='flex flex-col bg-white flex-grow rounded-lg shadow-md overflow-hidden'>
					{latestInvoices.length === 0 ? (
						<div className='flex flex-col items-center justify-center py-12 px-4 h-full'>
							<p className='mt-4 text-lg font-medium text-gray-600'>
								No invoices available
							</p>
							<p className='mt-2 text-sm text-gray-500 text-center'>
								When you create invoices, they'll appear here.
							</p>
						</div>
					) : (
						<div className='flex flex-col h-full overflow-auto'>
							<div
								className={`flex flex-col min-h-full ${
									latestInvoices.length === 9 && 'justify-center'
								}`}
							>
								{latestInvoices.slice(0, 5).map((invoice, i) => (
									<div
										key={invoice.id}
										className={clsx(
											'flex md:hidden items-center justify-between py-3 px-4 border-t border-gray-200',
											{
												'border-t-0': i === 0,
											}
										)}
									>
										<div className='flex items-center'>
											<CustomerAvatar name={invoice.name} />
											<div className='min-w-0'>
												<p className='truncate text-sm md:text-base font-medium'>
													{invoice.name}
												</p>
												<p className='text-sm text-gray-500'>
													{new Date(invoice.date).toDateString()}
												</p>
											</div>
										</div>
										<p className='truncate text-sm font-medium md:text-base'>
											{invoice.amount}
										</p>
									</div>
								))}
								{latestInvoices.map((invoice, i) => (
									<div
										key={invoice.id}
										className={clsx(
											'hidden md:flex items-center justify-between py-3 px-4 border-t border-gray-200',
											{
												'border-t-0': i === 0,
											}
										)}
									>
										<div className='flex items-center'>
											<CustomerAvatar name={invoice.name} />
											<div className='min-w-0'>
												<p className='truncate text-sm md:text-base font-medium'>
													{invoice.name}
												</p>
												<p className='text-sm text-gray-500'>
													{new Date(invoice.date).toDateString()}
												</p>
											</div>
										</div>
										<p className='truncate text-sm font-medium md:text-base'>
											{invoice.amount}
										</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
