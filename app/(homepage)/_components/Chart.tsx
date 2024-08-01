'use client';

import useSWR from 'swr';
import { getRevenueAction } from '@/actions/getRevenueAction';
import { RevenueChartSkeleton } from '@/components/Skeletons';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { formatPrice } from '@/lib/formatPrice';

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div
				className='custom-tooltip'
				style={{
					backgroundColor: 'white',
					padding: '5px',
					border: '1px solid #cccccc',
					borderRadius: '6px',
				}}
			>
				<p className='label'>{`${label} : ${formatPrice(payload[0].value)}`}</p>
			</div>
		);
	}
	return null;
};

export default function Chart({ clerkUserId }: { clerkUserId: string }) {
	const { data: revenue, isLoading } = useSWR(clerkUserId, getRevenueAction);

	const months = [
		{ month: 'Jan', index: 0 },
		{ month: 'Feb', index: 1 },
		{ month: 'Mar', index: 2 },
		{ month: 'Apr', index: 3 },
		{ month: 'May', index: 4 },
		{ month: 'June', index: 5 },
		{ month: 'July', index: 6 },
		{ month: 'Aug', index: 7 },
		{ month: 'Sep', index: 8 },
		{ month: 'Oct', index: 9 },
		{ month: 'Nov', index: 10 },
		{ month: 'Dec', index: 11 },
	];

	const calculateMonthlyRevenue = () => {
		const monthlyRevenue = Array(12).fill(0);

		revenue?.forEach(item => {
			const monthIndex = new Date(item.date).getMonth();
			monthlyRevenue[monthIndex] += item.amount;
		});

		return months.map((month, index) => ({
			month: month.month,
			Revenue: monthlyRevenue[index],
		}));
	};

	const monthlyRevenueData = calculateMonthlyRevenue();

	if (isLoading) {
		return <RevenueChartSkeleton />;
	}

	return (
		<div className='w-full md:col-span-4'>
			<div className='h-[42.5vh] rounded-lg bg-sky-100 p-4'>
				<ResponsiveContainer
					width='100%'
					height='100%'
				>
					<BarChart
						data={monthlyRevenueData}
						margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
					>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='month' />
						<YAxis
							label={{
								value: 'Revenue (£)',
								angle: -90,
								position: 'left',
								offset: 10,
							}}
							domain={['auto', 'auto']}
							tickFormatter={value => {
								if (value >= 1000) {
									return '£' + (value / 1000).toFixed(0) + 'k';
								}
								return '£' + value;
							}}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend />
						<Bar
							dataKey='Revenue'
							fill='rgba(56, 56, 56, 0.8)'
							barSize={30}
							radius={[5, 5, 0, 0]}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
