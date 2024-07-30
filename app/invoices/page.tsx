import Pagination from '../../components/Pagination';
import Table from './_components/Table';
import { CreateInvoice } from '../../components/Buttons';
import { TableSkeleton } from '@/components/Skeletons';
import { Suspense } from 'react';
import { getInvoicesPages } from '@/hooks/getInvoicesPage';
import { auth } from '@clerk/nextjs/server';
import TopNav from '@/components/TopNav';

export default async function Page({
	searchParams,
}: {
	searchParams: { query?: string; page?: string };
}) {
	const { userId: clerkUserId } = auth();

	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await getInvoicesPages(query, clerkUserId || '');
	console.log(totalPages);

	return (
		<div className='w-full'>
			<div className='flex w-full items-center justify-between'></div>
			<div className='flex items-center justify-between gap-2'>
				<CreateInvoice clerkUserId={clerkUserId || ''} />
				<TopNav />
			</div>
			<Suspense
				key={query + currentPage}
				fallback={<TableSkeleton />}
			>
				<Table
					query={query}
					currentPage={currentPage}
				/>
			</Suspense>
			<div className='my-5 flex w-full justify-center'>
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}
