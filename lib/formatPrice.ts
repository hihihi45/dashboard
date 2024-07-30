export const formatPrice = (amount: number) => {
	return amount.toLocaleString('en-UK', {
		style: 'currency',
		currency: 'GBP',
	});
};
