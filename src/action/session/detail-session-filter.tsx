"use server";
import * as z from "zod";
import { FilterSchema } from "@/schemas/index";
import { parseISO, format } from "date-fns";

export const detail_session_filter = async (
	data: {}[],
	values: z.infer<typeof FilterSchema>,
) => {
	const validatedFields = FilterSchema.safeParse(values);
	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}
	const { durationHours, durationMinutes, startTime, endTime } =
		validatedFields.data;
	const checkHours = !durationHours && durationMinutes ? "0" : durationHours;
	const checkMinutes =
		!durationMinutes && durationHours ? "0" : durationMinutes;
	if (durationHours) {
		data = data.filter((item: any) => {
			const durationObject = JSON.parse(
				item?.session?.duration || item?.duration,
			);
			const hours: string =
				durationObject.hours[0] === "0"
					? durationObject.hours[1]
					: durationObject.hours;
			const minutes: string | number =
				durationObject.minutes[0] === "0"
					? parseInt(durationObject.minutes[1])
					: durationObject.minutes;
			return (
				checkHours === hours && parseInt(checkMinutes as string) === minutes
			);
		});
	}
	if (durationMinutes) {
		data = data.filter((item: any) => {
			const durationObject = JSON.parse(
				item?.session?.duration || item?.duration,
			);
			const minutes: string | number =
				durationObject.minutes[0] === "0"
					? parseInt(durationObject.minutes[1])
					: durationObject.minutes;
			const hours: string =
				durationObject.hours[0] === "0"
					? durationObject.hours[1]
					: durationObject.hours;

			return (
				parseInt(checkMinutes as string) === minutes && checkHours === hours
			);
		});
	}
	if (startTime) {
		data = data.filter((item: any) => {
			const startTimeParsed = parseISO(
				item?.session?.startDateTime || item?.startDateTime,
			);
			const formattedTime = format(startTimeParsed, "HH:mm");

			return formattedTime === startTime;
		});
	}
	// TODO: Add filter for end time
	return { filteredData: data };
};
