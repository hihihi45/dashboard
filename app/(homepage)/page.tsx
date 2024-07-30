import Card from '@/components/Card';
import TopNav from '@/components/TopNav';
import { getCardData } from '@/hooks/getCardData';
import {
	BanknotesIcon,
	ClockIcon,
	UserGroupIcon,
	InboxIcon,
} from '@heroicons/react/24/outline';
import { auth } from '@clerk/nextjs/server';
import Chart from './_components/Chart';
import LatestInvoices from './_components/LatestInvoices';
import { formatPrice } from '@/lib/formatPrice';

export default async function Home() {
	const { userId: clerkUserId } = auth();
	const cardData = await getCardData(clerkUserId || '');
	console.log(cardData);

	return (
		<main className='w-full h-full flex flex-col '>
			<TopNav title='Overview' />
			<div className='flex flex-col flex-grow h-full'>
				{/* Large Screen */}
				<div className='flex flex-col md:flex-row flex-grow gap-4'>
					{/* Latest Invoices */}
					<div className='w-full md:w-[45%] h-full border rounded-xl bg-white'>
						<LatestInvoices />
					</div>

					{/* Chart and Cards Container */}
					<div className='w-full md:w-[55%] flex flex-col gap-4'>
						{/* Chart */}
						<div className='w-full h-auto md:h-[50%] border rounded-xl bg-white md:mb-0'>
							<Chart clerkUserId={clerkUserId || ''} />
						</div>

						{/* Cards Grid */}
						<div className='w-full h-auto md:h-[50%] grid grid-cols-2 gap-4'>
							<Card
								title='Collected'
								value={
									cardData
										? formatPrice(cardData.totalPaidInvoices)
										: formatPrice(0)
								}
								icon={<BanknotesIcon />}
								screenSize='desktop'
							/>
							<Card
								title='Pending'
								value={
									cardData
										? formatPrice(cardData.totalPendingInvoices)
										: formatPrice(0)
								}
								icon={<ClockIcon />}
								screenSize='desktop'
							/>
							<Card
								title='Customers'
								value={cardData ? cardData.numberOfCustomers : 0}
								icon={<UserGroupIcon />}
								screenSize='desktop'
							/>
							<Card
								title='Invoices'
								value={cardData ? cardData.numberOfInvoices : 0}
								icon={<InboxIcon />}
								screenSize='desktop'
							/>
						</div>
					</div>
				</div>

				{/* Small Screen */}
			</div>
		</main>
	);
}
