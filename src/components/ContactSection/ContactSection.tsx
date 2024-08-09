"use client";
import React, { useState } from "react";
import CustomInput from "../CustomInput/customInput";
import Formsy from "formsy-react";
import MainButton from "../Button/MainButton";
import { Button } from "@/components/ui/button";
const ContactSection = () => {
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const submitHandler = () => {};
	return (
		<div className="grid grid-cols-12 my-24 place-content-center">
			<p className="font-bold phone:text-6xl lg:col-start-2 lg:col-end-5 place-content-center col-start-2 col-end-11 mb-10 lg:mb-0 text-5xl">
				Contact Us, Give Us Your Feedback, We are Here for You
			</p>
			<div className=" lg:col-start-8 lg:col-end-11 col-start-2 col-end-11 flex justify-center
			max-h-72 ">
				<Formsy
					onValidSubmit={submitHandler}
					className="p-5 w-[300px] place-content-center flex flex-col items-center dark:bg-dark-lightBackground dark:border
					bg-white rounded-3xl dark:border-slate-800"
				>
					<CustomInput
						type="text"
						name="email"
						placeholder="Email"
						required
						value={email}
						validations="isEmail"
						validationError="This not a valid email"
					/>
					<CustomInput
						textArea
						name="Message"
						placeholder="Enter your message"
						value={message}
						required
						validationError="Please add message"
					/>
					<div className="flex justify-center">
						<Button type="submit" variant={'primary'}>
							Send Message
						</Button>
					</div>
				</Formsy>
			</div>
		</div>
	);
};

export default ContactSection;
