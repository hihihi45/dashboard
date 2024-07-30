import { CreateInvoiceForm } from '../_components/CreateInvoiceForm';
import { getCustomers } from '@/hooks/getCustomers';
import Breadcrumbs from '@/components/Breadcrumbs';
import { auth } from '@clerk/nextjs/server';

const CreateInvoicePage = async () => {
	const { userId: clerkUserId } = auth();

	const customers = await getCustomers(clerkUserId || '');

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Invoices', href: '/invoices' },
					{
						label: 'Create Invoice',
						href: '/invoices/create',
						active: true,
					},
				]}
			/>
			<CreateInvoiceForm
				customers={customers}
				clerkUserId={clerkUserId!}
			/>
		</main>
	);
};

export default CreateInvoicePage;
