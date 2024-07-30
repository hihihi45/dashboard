import clsx from 'clsx';
import Image from 'next/image';
import { getLatestInvoices } from '@/hooks/getLatestInvoices';
import InboxIcon from '@heroicons/react/24/outline/InboxIcon';
import { auth } from '@clerk/nextjs/server';

export default async function LatestInvoices() {
	const { userId: clerkUserId } = auth();

	const latestInvoices = await getLatestInvoices(clerkUserId || '');

	return (
		<div className='flex w-full h-full flex-col md:col-span-4'>
			<div className='w-full bg-sky-100 h-full p-2 rounded-lg'>
				<div className='flex items-center mb-2'>
					<InboxIcon className='h-5 w-5 text-gray-700' />
					<h3 className='ml-2  truncate'>Latest Invoices</h3>
				</div>

				<div className='bg-white h-[92%] md:h-[95%] rounded-lg shadow-md py-5'>
					{latestInvoices.length === 0 ? (
						<div className='flex flex-col items-center justify-center py-12 px-4'>
							<p className='mt-4 text-lg font-medium text-gray-600'>
								No invoices available
							</p>
							<p className='mt-2 text-sm text-gray-500 text-center'>
								When you create invoices, they'll appear here.
							</p>
						</div>
					) : (
						<div className='h-full md:pt-5'>
							{latestInvoices.slice(0, 5).map((invoice, i) => (
								<div
									key={invoice.id}
									className={clsx(
										'flex md:hidden items-center justify-between py-3 px-4 border-t border-gray-200 ',
										{
											'border-t-0': i === 0,
										}
									)}
								>
									<div className='flex items-center'>
										<Image
											src={invoice.image_url}
											alt={`${invoice.name}'s profile picture`}
											className='mr-4 rounded-full md:hidden lg:block'
											width={32}
											height={32}
										/>
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
										<Image
											src={invoice.image_url}
											alt={`${invoice.name}'s profile picture`}
											className='mr-4 rounded-full md:hidden lg:block'
											width={32}
											height={32}
										/>
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
					)}
				</div>
			</div>
		</div>
	);
}
