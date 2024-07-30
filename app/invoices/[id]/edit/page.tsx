import { EditInvoiceForm } from '../../_components/EditInvoicesForm';
import { notFound } from 'next/navigation';
import { getInvoices } from '@/hooks/getInvoices';
import { getCustomers } from '@/hooks/getCustomers';
import Breadcrumbs from '@/components/Breadcrumbs';
import { auth } from '@clerk/nextjs/server';

const EditInvoicesFormPage = async ({ params }: { params: { id: string } }) => {
	const { userId: clerkUserId } = auth();

	const invoices = await getInvoices(clerkUserId!);
	const customers = await getCustomers(clerkUserId || '');
	const selectedInvoice = invoices.find(invoice => invoice.id === params.id);

	if (!selectedInvoice) {
		notFound();
	}

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Invoices', href: '/invoices' },
					{
						label: 'Edit Invoice',
						href: `/invoices/${params.id}/edit`,
						active: true,
					},
				]}
			/>
			<EditInvoiceForm
				customers={customers}
				invoice={selectedInvoice}
				id={params.id}
				clerkUserId={clerkUserId || ''}
			/>
		</main>
	);
};

export default EditInvoicesFormPage;
