import { CreateCustomerForm } from '../_components/CreateCustomerForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { auth } from '@clerk/nextjs/server';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';

const CreateCustomersPage = () => {
	const { userId: clerkUserId } = auth();

	return (
		<main>
			<SignedIn>
				<Breadcrumbs
					breadcrumbs={[
						{ label: 'Customers', href: '/customers' },
						{
							label: 'Create Customer',
							href: '/customers/create',
							active: true,
						},
					]}
				/>
				<CreateCustomerForm clerkUserId={clerkUserId!} />
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</main>
	);
};

export default CreateCustomersPage;
