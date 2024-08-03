"use server";
import * as z from "zod";
import { EditProfileSchema } from "@/schemas/index";
import { currentUser } from "@/lib/authentication";
import { getUserByEmail, getUserById } from "@/data/user";
import { permanentRedirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const editProfile = async (
	values: z.infer<typeof EditProfileSchema>,
) => {
	//   const validatedFields = EditProfileSchema.safeParse(values);
	const user = await currentUser();
	if (!user) {
		return { error: "Unauthorized user :no user" };
	}

	const dbUser = await getUserById(user?.id as string);
	if (!dbUser) {
		return { error: "Unauthorized user :no dbsuer" };
	}
	//   const userData = validatedFields.data;
	if (values?.email && values.email !== user.email) {
		const existingUser = await getUserByEmail(values.email);
		if (existingUser && existingUser.id === user.id) {
			return { error: "Email already in use" };
		}
	}
	if (values?.password && values.newPassword && dbUser.password) {
		const passwordMatch = await bcrypt.compare(
			values.password,
			dbUser.password,
		);
		if (!passwordMatch) {
			return { error: "Incorrect password!" };
		}
		const hashedPassword = await bcrypt.hash(values.newPassword, 10);
		values.password = hashedPassword;
		values.newPassword = undefined;
	}
	const updatedUser = await db.user.update({
		where: { id: dbUser.id },
		data: { ...values },
	});
	console.log("Updated user >>", updatedUser)
	if(user.username !==updatedUser.username){
permanentRedirect(`/user/${updatedUser.username}`)
	}
	
	return { success: "User Data Updated", username: updatedUser.username };
};
