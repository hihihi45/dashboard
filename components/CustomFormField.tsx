import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ImageUpload from '@/app/customers/_components/ImageUpload';

interface CustomerProps {
	id: string;
	name: string;
}

interface CustomFormFieldProps {
	form: any;
	name: string;
	label: string;
	type?: string;
	customers?: CustomerProps[];
	className?: string;
}

const CustomFormField = ({
	form,
	name,
	label,
	type,
	customers,
	className,
}: CustomFormFieldProps) => {
	const sortedCustomers = customers?.sort((a, b) =>
		a.name.localeCompare(b.name)
	);

	return (
		<main>
			<FormField
				control={form.control}
				name={name}
				render={({ field }) => (
					<FormItem className='flex flex-col'>
						<FormLabel className='mt-4'>{label}</FormLabel>
						<FormControl>
							{name === 'status' ? (
								<RadioGroup
									className='flex mb-4'
									value={field.value}
									onValueChange={field.onChange}
								>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem
											value='pending'
											id='pending'
										/>
										<Label htmlFor='pending'>Pending</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem
											value='paid'
											id='paid'
										/>
										<Label htmlFor='paid'>Paid</Label>
									</div>
								</RadioGroup>
							) : customers?.length === 0 ? (
								<Input
									type={type}
									{...field}
									className={className}
									placeholder='Create a customer first before creating invoices'
								/>
							) : customers && customers?.length > 0 ? (
								<Select
									onValueChange={field.onChange}
									value={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a customer' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{sortedCustomers?.map(customer => (
												<SelectItem
													key={customer.id}
													value={customer.id}
												>
													{customer.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							) : type === 'date' ? (
								<div className='w-full'>
									<DatePicker
										selected={field.value}
										//@ts-ignore
										// Simple case of not needing to change the whole typing system in order to support this, doesn't have an effect on anything else
										onChange={(date: Date) => field.onChange(date)}
										dateFormat='yyyy-MM-dd'
										className='w-full p-2 text-sm rounded-md border border-input focus:ring-2 focus:ring-primary focus:outline-none focus:ring-offset-2 ring-offset-2'
										popperPlacement='top'
									/>
								</div>
							) : type === 'file' ? (
								<ImageUpload
									value={field.value}
									onChange={image => field.onChange(image)}
								/>
							) : (
								<Input
									className={className}
									{...field}
									type={type}
								/>
							)}
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</main>
	);
};

export default CustomFormField;
