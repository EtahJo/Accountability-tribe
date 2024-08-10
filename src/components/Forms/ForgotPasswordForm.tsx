"use client"
import {useState, useTransition } from "react";
import Formsy from "formsy-react";
import 
{ Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import CustomInput from "../CustomInput/customInput";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/Messages/Error";
import { FormSuccess } from "@/components/Messages/Success";
import { reset_password } from "@/action/auth/reset-password";
import * as z from 'zod';
import { ResetSchema } from "@/schemas";


const ForgotPasswordForm = () => {
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('')
	const [isPending, startTransition]= useTransition();

	const onValidSubmit =(vals:z.infer<typeof ResetSchema>)=>{
		setError('');
    	setSuccess('');
		startTransition(()=>{
			reset_password(vals).then((data)=>{
				if(data.error){
					 setError(data?.error);
				}
				if(data.success){
					  setSuccess(data?.success);
				}
			})
		})
	}

	return (
	<Card className="relative">
		<CardHeader>
			<CardTitle className="bg-lightPink dark:bg-dark-background rounded-full shadow-buttonInner p-4 
			font-bold phone:text-3xl text-center text-xl">Forgot Password Form</CardTitle>
		</CardHeader>
		<CardContent>
			<Formsy className="flex flex-col items-center" onValidSubmit={onValidSubmit}>
				<CustomInput
				name="email"
				type="text"
				placeholder="Email"
				required
				disabled={isPending}
				/>
			<div className="my-2">
				{error && <FormError message={error}/>}
				{success && <FormSuccess message={success}/>}
			</div>
			<Button type="submit" disabled={isPending}>Submit</Button>
			</Formsy>
		</CardContent>

	</Card>
		
);
};

export default ForgotPasswordForm;
