import { taskFilter } from "@/util/Filter";

export const filteredPeriod = (
	value: string,
	tasks: [],
	setFilteredData: (value: any) => void,
) => {
	const filteredPeriodData = taskFilter(tasks, "period", value);
	setFilteredData(filteredPeriodData);
};
export const filteredStatus = (
	value: string,
	tasks: [],
	setFilteredData: (value: any) => void,
) => {
	const filteredData = taskFilter(tasks, "status", value);
	setFilteredData(filteredData);
};
export const filteredPriority = (
	value: string,
	tasks: [],
	setFilteredData: (value: any) => void,
) => {
	const filteredData = taskFilter(tasks, "priority", value);
	setFilteredData(filteredData);
};
export const filteredDate = (
	value: any,
	tasks: [],
	setFilteredData: (value: any) => void,
) => {
	const filteredData = taskFilter(tasks, "date", value);
	setFilteredData(filteredData);
};
export const onValidSubmit = (
	vals: any,
	tasks: [],
	setFilteredData: (value: any) => void,
) => {
	let data: any = tasks;
	Object.entries(vals).forEach(([key, value]: any) => {
		if (value) {
			data = taskFilter(data, key, value);
		}
	});
	setFilteredData(data);
};
