"use client"
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Formsy from "formsy-react";
import Link from "next/link";
import * as z from "zod";

import Custominput from "@/components/CustomInput/customInput";
import GoogleLoginButton from "@/app/auth/_components/GoogleLoginButton";
import { login } from "@/action/auth/login";
import { LoginSchema } from "@/schemas/index";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/Messages/Error";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { editProfile } from "@/action/auth/edit-profile";

const LoginForm = () => {
    const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [vissible, setVissible] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
    	const onSubmit = (vals: z.infer<typeof LoginSchema>) => {
		startTransition(() => {
			login(vals, callbackUrl)
				.then((data) => {
					if (data?.error) {
						setError(data.error);
					}
					if (data?.success) {
						editProfile({
							remember: vals.remember,
						});
					}
				})
				.catch(() => setError("Something went wrong"));
		});
	};
  return (
    	<div className="relative">
				<div className="bg-white rounded-3xl p-10 shadow-buttonInner  relative dark:bg-dark-lightBackground dark:border dark:border-slate-800">
					<h1 className="bg-lightPink dark:bg-dark-background rounded-full shadow-buttonInner p-4 font-bold phone:text-3xl text-center text-xl">
						Login Here
					</h1>
					<Formsy autoComplete="off" onValidSubmit={onSubmit} className="mb-3 m-auto min-[538px]:w-full w-max">
						<Custominput
							name="email"
							type="text"
							placeholder="Email"
							required
							value={email}
							validations="isEmail"
							validationError="This is not a valid Email"
							disabled={isPending}
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
						<div className="my-3">
							<Link
								href="/auth/forgot-password"
								className="text-lightPink font-bold my-5 dark:text-dark-text hover:underline"
							>
								Forgot Password?
							</Link>
						</div>
						{error && <FormError message={error} />}
						<div className="w-full place-content-center m-auto flex flex-col items-center gap-y-2">
							<Button size={"slg"} variant="primary" disabled={isPending}>
								Login
							</Button>
							<GoogleLoginButton />
						</div>
					</Formsy>
					
				</div>
			</div>
  )
}

export default LoginForm