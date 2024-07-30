import React from 'react';

const stringToColor = (str: string): string => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = '#';
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff;
		color += ('00' + value.toString(16)).slice(-2);
	}
	return color;
};

const getInitials = (name: string): string => {
	const [firstName, lastName] = name.split(' ');
	return (firstName?.charAt(0) || '') + (lastName?.charAt(0) || '');
};

const CustomerAvatar = ({ name }: { name: string }) => {
	const initials = getInitials(name);
	const backgroundColor = stringToColor(name);

	return (
		<div
			className='flex md:hidden lg:flex mr-3 items-center justify-center rounded-full h-8 w-8 text-white font-bold'
			style={{ backgroundColor }}
		>
			{initials}
		</div>
	);
};

export default CustomerAvatar;
