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
		<Formsy autoComplete="off" onValidSubmit={onSubmit}>
			<Custominput
				name="username"
				type="text"
				placeholder="Username"
				required
				disabled={isPending}
				value={username}
				validationError="Field is required"
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
							color="purple"
							onClick={() => {
								setVissible(false);
							}}
						/>
					) : (
						<AiFillEye
							color="purple"
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
							color="purple"
							onClick={() => {
								setVissible(false);
							}}
						/>
					) : (
						<AiFillEye
							color="purple"
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
			<div className="w-full place-content-center m-auto flex flex-col gap-y-3">
				<Button size={"slg"} variant="primary" disabled={isPending}>
					Sign Up
				</Button>
				<GoogleLoginButton />
			</div>
		</Formsy>
	);
};

export default SignUpForm;
