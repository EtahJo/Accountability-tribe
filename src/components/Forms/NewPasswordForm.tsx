"use client"
import {useState, useTransition } from "react";
import Formsy from "formsy-react";
import 
{ Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import CustomInput from "../CustomInput/customInput";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useSearchParams, useRouter } from "next/navigation";
import { new_password } from "@/action/auth/new-password";
import { NewPasswordSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/Messages/Error";
import { FormSuccess } from "@/components/Messages/Success";
import * as z from 'zod'

const NewPasswordForm = () => {
    const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [vissible, setVissible] = useState<boolean>(false);
    const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
    const searchParams= useSearchParams();
    const router = useRouter()
    const token = searchParams.get('token')
	const [isPending, startTransition] = useTransition();
    const onValidSubmit=(vals:z.infer<typeof NewPasswordSchema>)=>{
        setError('');
        setSuccess('');
        startTransition(()=>{
            new_password(vals,token).then((data)=>{
                if(data.error){
                    setSuccess(data.error)
                }
                if(data.success){
                    setSuccess(data.success);
                    router.push('/auth/login');
                }
            })
        })
    }
  return (
    <Card className="relative">
        <CardHeader>
            <CardTitle className="bg-lightPink dark:bg-dark-background rounded-full shadow-buttonInner p-4 
			font-bold phone:text-3xl text-center text-xl">New Password</CardTitle>
        </CardHeader>
        <CardContent>
            <Formsy className="flex flex-col items-center" onValidSubmit={onValidSubmit}>
                <CustomInput
				name="password"
				type={vissible ? "text" : "password"}
				placeholder=" New Password"
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
            <CustomInput
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
            	<div className="my-2">
				{error && <FormError message={error}/>}
				{success && <FormSuccess message={success}/>}
			</div>
			<Button type="submit" disabled={isPending}>Submit</Button>
            </Formsy>

        </CardContent>
    </Card>
  )
}

export default NewPasswordForm