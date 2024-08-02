import * as z from "zod";
import { boolean } from "zod";
import { Status } from "@prisma/client";

export const LoginSchema = z.object({
	email: z.string().email({ message: "Email is required" }),
	password: z.string().min(1, { message: "Password is required" }),
	remember: z.optional(boolean()),
});

export const RegisterSchema = z
	.object({
		username: z
			.string()
			.min(4, { message: "Username must be longer than 4 characters" }),
		email: z.string().email({ message: "Email is required" }),
		timezone: z.string().min(1, { message: "Please select timezone" }),
		password: z
			.string()
			.min(6, { message: "Password must be more than 6 characters" }),
		confirmPassword: z.string().min(6),
	})
	.refine(
		(data) => {
			if (data.password != data.confirmPassword) {
				return false;
			}
			return true;
		},
		{
			message: "Passwords do not match",
		},
	);

export const EditProfileSchema = z
	.object({
		username: z.optional(
			z
				.string()
				.min(4, { message: "Username must be longer than 4 characters" }),
		),
		email: z.optional(z.string().email({ message: "Email is required" })),
		password: z.optional(
			z.string().min(6, { message: "Password must be more than 6 characters" }),
		),
		newPassword: z.optional(
			z.string().min(6, { message: "Password must be more than 6 characters" }),
		),
		remember: z.optional(z.boolean()),
		number: z.optional(z.string()),
		linkedIn: z.optional(z.string()),
		facebook: z.optional(z.string()),
		X: z.optional(z.string()),
		image: z.optional(z.string()),
		country: z.optional(z.string()),
		timezone: z.optional(z.string()),
	})
	.refine(
		(data) => {
			if (data.password && !data.newPassword) {
				return false;
			}
			if (!data.password && data.newPassword) {
				return false;
			}
			return true;
		},
		{
			message: "Fill both new password and password or none",
			path: ["newPassword"],
		},
	);
export const CreateSessionTaskSchema = z.object({
	taskId: z.string(),
	// sessionParticipantId: z.string(),
});
export const LinkMultipleTaskSchema = z.object({
	taskIds: z.array(z.object({ value: z.string(), label: z.string() })),
});
export const CreateSessionSchema = z.object({
	goal: z.string().min(1, { message: "Adding a goal is Essential" }),
	startEndDateTime: z.object({
		startDateTime: z.date(),
		endDateTime: z.date(),
	}),
	taskIds: z.optional(
		z.array(z.object({ value: z.string(), label: z.string() })),
	),
	meetingLink: z
		.string()
		.regex(
			/^https:\/\/meet\.google\.com\/[a-zA-Z]{3,4}-[a-zA-Z]{4}-[a-zA-Z]{3}$/,
			{ message: "Please enter a valid google meeting link" },
		),
	duration: z.optional(z.string()),
});

export const EditSessionSchema = z
	.object({
		goal: z.optional(
			z.string().min(1, { message: "Adding a goal is Essential" }),
		),
		taskIds: z.optional(
			z.array(z.object({ value: z.string(), label: z.string() })),
		),
		startEndDateTime: z.optional(
			z.object(
				{
					startDateTime: z.date(),
					endDateTime: z.date(),
				},
				{ message: "Date issue" },
			),
		),

		meetingLink: z.optional(
			z.string().min(1, { message: "Please add a Google Meeting Link" }),
		),

		duration: z.optional(z.string()),
	})
	.refine((data) => {
		const date = new Date();
		if (data?.startEndDateTime) {
			if (data?.startEndDateTime?.startDateTime < date) {
				return false;
			}
		}
	});
export const CreateTribeSchema = z.object({
	name: z.string().min(1, { message: "Please add tribe name" }),
	description: z.optional(z.string()),
	profileImage: z.optional(z.string()),
	tags: z.array(z.string(), { message: "Select atleast one tag" }),
});
export const EditTribeSchema = z.object({
	name: z.optional(z.string()),
	description: z.optional(z.string()),
	profileImage: z.optional(z.string()),
	tags: z.optional(z.array(z.string(), { message: "Select atleast one tag" })),
});

export const CreatePostSchema = z.object({
	title: z.string().min(2, { message: "Post must have a title" }),
	content: z.string().min(2, { message: "Post must have content" }),
});
export const EditPostSchema = z.object({
	title: z.string(),
	content: z.string(),
});
export const CreateCommentSchema = z.object({
	content: z.string().min(1, { message: "Comment Content required" }),
});

export const CreateTaskSchema = z.object({
	title: z.string().min(1, { message: "Every task needs a title" }),
	description: z.optional(z.string()),
	priority: z.number(),
	dueDate: z.date(),
});

export const CreateTaskArraySchema = z.array(CreateTaskSchema);

export const EditTaskSchema = z.object({
	title: z.optional(z.string()),
	description: z.optional(z.string()),
	priority: z.optional(z.number()),
	dueDate: z.optional(z.date()),
	dateCompleted: z.optional(z.date()),
	status: z.optional(
		z.enum([
			Status.COMPLETE,
			Status.NOTSTARTED,
			Status.PROGRESS,
			Status.STARTED,
		]),
	),
	sessionParticipantId: z.optional(z.string()),
});

export const FilterSchema = z.object({
	durationHours: z.optional(z.string().default("0")),
	durationMinutes: z.optional(z.string().default("0")),
	startTime: z.optional(z.string()),
	endTime: z.optional(z.string()),
});
