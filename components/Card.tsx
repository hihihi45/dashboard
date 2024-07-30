import { ReactElement } from 'react';
import { auth } from '@clerk/nextjs/server';

interface CardProps {
	value: number | string;
	title: string;
	icon: ReactElement;
	screenSize: 'desktop' | 'mobile';
}

const Card = ({ value, title, icon: Icon, screenSize }: CardProps) => {
	const { userId: clerkUserId } = auth();

	return (
		<div className='w-full bg-sky-100 h-full p-2 rounded-lg flex flex-col'>
			<div className='flex items-center space-x-2 mb-2'>
				<span className='size-6'>{Icon}</span>
				<p>{title}</p>
			</div>
			<div
				className={`bg-white p-4 rounded-lg border flex items-center justify-center flex-grow ${
					screenSize === 'desktop' ? 'md:h-[73%]' : 'md:h-[85%]'
				}`}
			>
				<p className='text-center text-xl font-semibold'>{value}</p>
			</div>
		</div>
	);
};

export default Card;
