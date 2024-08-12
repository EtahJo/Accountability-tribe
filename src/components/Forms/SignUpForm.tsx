"use client";
import { useState, useTransition } from "react";
import Formsy from "formsy-react";
import Custominput from "@/components/CustomInput/customInput";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import * as z from "zod";
import { RegisterSchema } from "@/schemas/index";
import { signup } from "@/action/auth/signup";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/Messages/Error";
import { FormSuccess } from "@/components/Messages/Success";
import GoogleLoginButton from "@/app/auth/_components/GoogleLoginButton";

import TimeZoneInput from "@/components/TimeZoneInput/index";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [timezone, setTimezone] = useState("");
	const [vissible, setVissible] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();
	const onSubmit = (vals: z.infer<typeof RegisterSchema>) => {
		startTransition(() => {
			signup(vals)
				.then((data) => {
					if (data.error) {
						setSuccess("");
						setError(data.error);
					}
					if (data.success) {
						setError("");
						setSuccess(data.success);
						router.push("/auth/login");
					}
				})
				.catch((error) => {
					setSuccess("");
					setError("Something went wrong !!");
				});
		});
	};
	return (
	<div className="relative ">
		<div className="bg-white rounded-3xl p-7 shadow-buttonInner relative dark:bg-dark-lightBackground dark:border dark:border-slate-800">
			<h1 className="bg-lightPink dark:bg-dark-background rounded-full 
					shadow-buttonInner p-4 font-bold phone:text-3xl text-center text-xl w-max m-auto">
				Sign Up Here
			</h1>
		<Formsy autoComplete="off" onValidSubmit={onSubmit} className='m-auto min-[538px]:w-full w-max'>
			<Custominput
				name="username"
				type="text"
				placeholder="Username"
				required
				disabled={isPending}
				value={username}
				validationError="Field is required"
				maxLength={15}
			/>

			<Custominput
				name="email"
				type="text"
				placeholder="Email"
				required
				disabled={isPending}
				value={email}
				validations="isEmail"
				validationError="This is not a valid Email"
			/>
			<TimeZoneInput
				name="timezone"
				value={timezone}
				onChange={(timezone) => setTimezone(timezone)}
			/>
			<Custominput
				name="password"
				type={vissible ? "text" : "password"}
				placeholder="Password"
				value={password}
				disabled={isPending}
				Icon={
					vissible ? (
						<AiFillEyeInvisible
							className="text-purple dark:text-dark-primary"
							onClick={() => {
								setVissible(false);
							}}
						/>
					) : (
						<AiFillEye
							className="text-purple dark:text-dark-primary"
							onClick={() => {
								setVissible(true);
							}}
						/>
					)
				}
			/>
			<Custominput
				name="confirmPassword"
				type={vissible ? "text" : "password"}
				placeholder=" Confirm Password"
				disabled={isPending}
				value={confirmPassword}
				Icon={
					vissible ? (
						<AiFillEyeInvisible
							className="text-purple dark:text-dark-primary"
							onClick={() => {
								setVissible(false);
							}}
						/>
					) : (
						<AiFillEye
							className="text-purple dark:text-dark-primary"
							onClick={() => {
								setVissible(true);
							}}
						/>
					)
				}
			/>
			<div className="my-3">
				{error && <FormError message={error} />}
				{success && <FormSuccess message={success} />}
			</div>
			<div className="w-full place-content-center m-auto flex flex-col gap-y-3 items-center">
				<Button size={"slg"} variant="primary" disabled={isPending}>
					Sign Up
				</Button>
				<GoogleLoginButton />
			</div>
		</Formsy>
		</div>
	</div>
	);
};

export default SignUpForm;
