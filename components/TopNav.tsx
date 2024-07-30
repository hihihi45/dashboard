'use client';

import React from 'react';
import { Button } from './ui/button';
import { Info, User } from 'lucide-react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { SignedIn, UserButton } from '@clerk/nextjs';

const TopNav = ({ title }: { title?: string }) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((query: string) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', '1');
		if (query) {
			params.set('query', query);
		} else {
			params.delete('query');
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div className='flex items-center min-h-[80px]'>
			<p className='p-4 font-semibold text-lg'>{title}</p>
			<div className='w-full grow h-12 lg:w-96 space-x-2 flex items-center justify-end'>
				{(pathname === '/customers' || pathname === '/invoices') && (
					<div className='relative flex items-center w-[70%]'>
						<MagnifyingGlassIcon
							aria-hidden='true'
							className='h-5 w-5 text-gray-400 absolute left-3'
						/>
						<input
							id='search'
							name='search'
							type='search'
							defaultValue={searchParams.get('query') || ''}
							onChange={e => handleSearch(e.target.value)}
							placeholder='Search'
							className='block w-full rounded-xl border-0 py-2.5 pl-10 pr-3 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
						/>
					</div>
				)}

				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</div>
	);
};

export default TopNav;
