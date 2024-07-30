import { SignIn } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className='w-full flex pt-16 justify-center items-center'>
			<SignIn />
		</div>
	);
}
