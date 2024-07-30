'use client';

import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignOutButton,
} from '@clerk/nextjs';
import { Home, PoundSterling, File, LogIn, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const sidebarItems = [
	{
		name: 'Home',
		icon: <Home size={16} />,
		href: '/',
	},
	{
		name: 'Invoices',
		icon: <PoundSterling size={16} />,
		href: '/invoices',
	},
	{
		name: 'Customers',
		icon: <File size={16} />,
		href: '/customers',
	},
];

const Sidebar = () => {
	const pathname = usePathname();

	return (
		<div className='py-4 pl-4 hidden md:flex flex-col h-full w-44 lg:w-56'>
			<div className='space-y-2'>
				{sidebarItems.map(item => (
					<Link
						key={item.name}
						href={item.href}
						className={`${
							pathname === item.href ? 'bg-sky-100' : ''
						} w-full hover:bg-sky-100 transition-all border rounded-lg px-4 h-12 flex items-center group group-hover:bg-slate-300`}
					>
						<div>
							<div className='w-full flex items-center'>
								{item.icon}
								<p className='pl-2 text-sm lg:text-md'>{item.name}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
			<aside className='border rounded-xl flex-grow mt-2'></aside>

			<SignedOut>
				<SignInButton mode='modal'>
					<div className='w-full cursor-pointer border rounded-lg px-4 h-12 flex items-center mt-2 hover:bg-sky-100 transition-all'>
						<LogIn size={16} />
						<p className='pl-2 text-sm lg:text-md'>Sign in</p>
					</div>
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<SignOutButton>
					<div className='w-full cursor-pointer border rounded-lg px-4 h-12 flex items-center mt-2 hover:bg-sky-100 transition-all'>
						<LogOut size={16} />
						<p className='pl-2 text-sm lg:text-md'>Sign out</p>
					</div>
				</SignOutButton>
			</SignedIn>
			<div className='w-full h-36 border rounded-lg mt-2 bg-sky-100 p-4'>
				<Image
					src='/logo.svg'
					alt='logo'
					width={80}
					height={80}
				/>
			</div>
		</div>
	);
};

export default Sidebar;
