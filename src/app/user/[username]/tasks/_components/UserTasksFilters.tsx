"use client";
import { useState } from "react";
import DateOnlyInput from "@/components/CustomDateInput/DateOnlyInput";
import Formsy from "formsy-react";
import {
	statusItems,
	priorityItems,
	periodItems,
} from "../_data/dropdownItems";
import FormsySelectInput from "@/components/CustomSelectInput/FormsySelectInput";
import { Button } from "@/components/ui/button";

interface UserTasksFiltersProps {
	filterPeriod: (value: string) => void;
	filterStatus: (value: string) => void;
	filterPriority: (value: string) => void;
	filterDate: (value: string) => void;
	onValidSubmit: (value: string) => void;
}
const UserTasksFilters = ({
	filterPeriod,
	filterStatus,
	filterPriority,
	filterDate,
	onValidSubmit,
}: UserTasksFiltersProps) => {
	const [dueDate, setDueDate] = useState<Date | null>(null);
	const [status, setStatus] = useState("");
	const [priority, setPriority] = useState("");
	const [period, setPeriod] = useState("");
	const removeFilters = () => {
		setPeriod("");
		setDueDate(null);
		setStatus("");
		setPriority("");
		filterPeriod("");
	};
	return (
		<div className="my-5">
			<Formsy
				className="flex flex-wrap gap-4 bg-white rounded-3xl shadow-3xl p-5 max-largePhone:justify-center "
				onValidSubmit={onValidSubmit}
			>
				<div className="flex items-start gap-1 flex-col ">
					<p className="font-bold">Choose Due Date</p>
					<div className="-my-4 flex items-center gap-1">
						<DateOnlyInput
							name="date"
							value={dueDate}
							date={dueDate as Date}
							setDate={(date: any) => {
								setDueDate(date.toISOString());
								filterDate(date.toISOString());
							}}
						/>
						<p
							onClick={() => {
								setDueDate(null);
								filterDate("");
							}}
							className="text-xs font-bold cursor-pointer hover:text-purple"
						>
							X
						</p>
					</div>
				</div>
				<div className="flex items-start gap-1 flex-col">
					<p className="font-bold">Period</p>
					<div className="-mt-4 flex items-center gap-1">
						<FormsySelectInput
							name="period"
							value={period}
							onValueChange={(value: any) => {
								setPeriod(value);
								filterPeriod(value);
							}}
							items={periodItems}
							placeholder={"Choose"}
						/>
						<p
							onClick={() => {
								setPeriod("");
								filterPeriod("");
							}}
							className="text-xs font-bold cursor-pointer hover:text-purple"
						>
							X
						</p>
					</div>
				</div>
				<div className="flex items-start gap-1 flex-col">
					<p className="font-bold">Status</p>
					<div className="-mt-4 flex items-center gap-1">
						<FormsySelectInput
							name="status"
							value={status}
							onValueChange={(value: string) => {
								setStatus(value);
								filterStatus(value);
							}}
							items={statusItems}
							placeholder={"Choose"}
						/>
						<p
							onClick={() => {
								setStatus("");
								filterStatus("");
							}}
							className="text-xs font-bold cursor-pointer hover:text-purple"
						>
							X
						</p>
					</div>
				</div>
				<div className="flex items-start gap-1 flex-col">
					<p className="font-bold">Priority</p>
					<div className="-mt-4 flex items-center gap-1">
						<FormsySelectInput
							name="priority"
							value={priority}
							onValueChange={(value: any) => {
								setPriority(value);
								filterPriority(value);
							}}
							items={priorityItems}
							placeholder={"Choose"}
						/>
						<p
							onClick={() => {
								setPriority("");
								filterPriority("");
							}}
							className="text-xs font-bold cursor-pointer hover:text-purple"
						>
							X
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<Button type="submit" className="move-button">
						Combine Filters
					</Button>
					<Button
						type="button"
						className="move-button"
						onClick={removeFilters}
						variant={"outline"}
					>
						Remove Filters
					</Button>
				</div>
			</Formsy>
		</div>
	);
};

export default UserTasksFilters;
