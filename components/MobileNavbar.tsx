import React from 'react';
import { Home, PoundSterling, User, File, LogIn } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignOutButton,
} from '@clerk/nextjs';

const mobileNavbarItems = [
	{
		name: 'Home',
		icon: <Home />,
		href: '/',
	},
	{
		name: 'Invoices',
		icon: <PoundSterling />,
		href: '/invoices',
	},
	{
		name: 'Customers',
		icon: <File />,
		href: '/customers',
	},
];

const MobileNavbar = () => {
	return (
		<nav className='w-full block md:hidden h-14 rounded-lg pb-4 mt-4'>
			<div className='grid grid-cols-4 h-full gap-2'>
				{mobileNavbarItems.map(item => (
					<div
						className='flex w-full h-full items-center justify-center'
						key={item.href}
					>
						<Link
							href={item.href}
							className='w-full rounded-lg items-center justify-center flex '
						>
							<Button className='w-full'>
								<p>{item.name}</p>
							</Button>
						</Link>
					</div>
				))}
				<SignedOut>
					<SignInButton mode='modal'>
						<Button>Sign In</Button>
					</SignInButton>
				</SignedOut>
				<SignedIn>
					<div className='flex w-full h-full items-center justify-center'>
						<SignOutButton>
							<Button className='w-full'>Sign Out</Button>
						</SignOutButton>
					</div>
				</SignedIn>
			</div>
		</nav>
	);
};

export default MobileNavbar;
