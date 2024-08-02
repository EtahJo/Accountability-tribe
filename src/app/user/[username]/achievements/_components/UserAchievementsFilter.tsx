"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Formsy from 'formsy-react';
import DateOnlyInput from "@/components/CustomDateInput/DateOnlyInput";
import FormsySelectInput from '@/components/CustomSelectInput/FormsySelectInput';

const UserAchievementsFilter = () => {
	const [period, setPeriod] = useState("");
	const [dateCompleted, setDateCompleted] = useState<Date|null>(null)
	const router = useRouter()
	const periodItems = [
		{
		title: "All",
		id: "all",
	},
	{
		title: "Today",
		id: "today",
	},
	{
		title: "This Week",
		id: "thisWeek",
	},
	{
		title: "This Month",
		id: "thisMonth",
	},
	{
		title: "This Year",
		id: "thisYear",
	},
];
	return( 
	<Formsy className='bg-white rounded-2xl p-5 flex items-start
	 gap-2 max-md:flex-col max-md:items-center'>
		<FormsySelectInput
			lable='Period'
			name="period"
			value={period}
			onValueChange={(value: string) => {
				setPeriod(value);
				router.push(`?page=1&filter=${value}`)
				
			}}
			items={periodItems}
			placeholder={"Choose"}
		/>
			<DateOnlyInput
				lable='Date'
				name="date"
				value={dateCompleted}
				date={dateCompleted as Date}
				setDate={(date: any) => {
					setDateCompleted(date.toISOString());
					router.push(`?page=1&filter=date&date=${date.toISOString()}`)
								
				}}
			/>
	</Formsy>)
};

export default UserAchievementsFilter;
