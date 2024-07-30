import { EditCustomerForm } from '../../_components/EditCustomerForm';
import { getCustomers } from '@/hooks/getCustomers';
import Breadcrumbs from '@/components/Breadcrumbs';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

const EditCustomersFormPage = async ({
	params,
}: {
	params: { id: string };
}) => {
	const { userId: clerkUserId } = auth();
	const customers = await getCustomers(clerkUserId || '');
	const selectedCustomer = customers.find(
		customer => customer.id === params.id
	);

	if (!selectedCustomer) {
		notFound();
	}

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Customers', href: '/customers' },
					{
						label: 'Edit Customer',
						href: `/customers/${params.id}/edit`,
						active: true,
					},
				]}
			/>
			<EditCustomerForm
				customer={selectedCustomer}
				id={params.id}
				clerkUserId={clerkUserId || ''}
			/>
		</main>
	);
};

export default EditCustomersFormPage;
