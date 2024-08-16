"use client";
import { useState, useTransition } from "react";
import CustomInput from "../CustomInput/customInput";
import Formsy from "formsy-react";
import { Button } from "@/components/ui/button";
import { contact_form } from "@/action/contact-form";
import * as z from 'zod';
import { ContactUsSchema } from "@/schemas";
import { FormError } from "@/components/Messages/Error";
import { FormSuccess } from "@/components/Messages/Success";

const ContactSection = () => {
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const[isPending,startTransition]=useTransition()
	const submitHandler = (vals:z.infer<typeof ContactUsSchema >) => {
		setSuccess('')
		setError('')
		startTransition(()=>{
			contact_form(vals).then((data)=>{
				if(data.succes){
					setSuccess(data.succes)
				}
				if(data.error){
					setError(data.error)
				}
			})
		})
	};
	return (
		<div className="grid grid-cols-12 my-24 place-content-center">
			<p className="font-bold phone:text-6xl lg:col-start-2 lg:col-end-5 place-content-center col-start-2 col-end-11 mb-10 lg:mb-0 text-5xl">
				Contact Us, Give Us Your Feedback, We are Here for You
			</p>
			<div className=" lg:col-start-8 lg:col-end-11 col-start-2 col-end-11 flex justify-center
			max-h-72 ">
				<Formsy
					onValidSubmit={submitHandler}
					className="p-5  place-content-center flex flex-col items-center dark:bg-dark-lightBackground dark:border
					bg-white rounded-3xl dark:border-slate-800"
				>
					<CustomInput
						type="text"
						name="email"
						placeholder="Email"
						required
						disabled={isPending}
						value={email}
						validations="isEmail"
						validationError="This not a valid email"
					/>
					<CustomInput
						textArea
						name="message"
						placeholder="Enter your message"
						value={message}
						disabled={isPending}
						required
						validationError="Please add message"
					/>
					{error&& <FormError message={error}/>}
					{success && <FormSuccess message={success}/>}
					<div className="flex justify-center mt-2">
						<Button type="submit" variant={'primary'} disabled={isPending}>
							Send Message
						</Button>
					</div>
				</Formsy>
			</div>
		</div>
	);
};

export default ContactSection;
