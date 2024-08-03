"use client";
import { useState, useTransition } from "react";
import Formsy from "formsy-react";
import { useRouter } from "next/navigation";
import Custominput from "@/components/CustomInput/customInput";
import CustomCheckbox from "@/components/CustomCheckbox/index";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { EditProfileSchema } from "@/schemas/index";
import { mutate } from "swr";
import { editProfile } from "@/action/auth/edit-profile";
import * as z from "zod";
import UploadImage from "@/components/UploadImage/index";
import { FormError } from "@/components/Messages/Error";
import { FormSuccess } from "@/components/Messages/Success";
import CountryInput from "@/components/CountryInput/index";
import PhoneNumberInput from "@/components/PhoneNumberInput/index";
import TimeZoneInput from "@/components/TimeZoneInput/index";
import SectionHeader from "@/components/SectionHeader";

const Editprofile = () => {
	const [isPending, startTransition] = useTransition();
	const { user, phoneNumber }: any = useCurrentUser();
	const router = useRouter()
	const [formData, setFormData] = useState({
		username: user?.username || undefined,
		email: user?.email || undefined,
		password: undefined,
		newPassword: undefined,
		remember: user?.remember || false,
		number: phoneNumber || undefined,
		linkedIn: user?.linkedIn || undefined,
		facebook: user?.facebook || undefined,
		X: user?.x || undefined,
		image: user?.image || undefined,
		country: user?.country || undefined,
		checked: false,
		timezone: user?.timezone || undefined,
	});
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const onSubmit = (vals: z.infer<typeof EditProfileSchema>) => {
		startTransition(() => {
			editProfile(vals).then((data) => {
				if (data.error) {
					setError(data.error);
				}
				if (data.success) {
					setSuccess(data.success);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/${data.username}`,
					);
					// if(vals.username !== user.Username){
					// 	window.location.reload()
					// 	router.replace(`/user/${user.username}`,``)
					// }
				}
			});
		});
	};
	return (
		<div className="flex flex-col m-auto">
			<div className="min-[640px]:mt-0 mt-16 flex justify-center">
				<SectionHeader name="Edit Profile" />
			</div>

			<Formsy
				className="h-max items-center flex mt-28"
				onValidSubmit={onSubmit}
			>
				<div className="bg-white rounded-5xl p-5 m-auto w-3/4 shadow-3xl relative">
					<div className="flex flex-col ">
						<UploadImage name="image" presentImage={user?.image} />
						{user?.image && (
							<div className="flex justify-center mt-5">
								<Button
									onClick={() => {
										setFormData((prev) => ({ ...prev, image: undefined }));
									}}
									className=" w-36 place-content-center move-button"
									size="sm"
								>
									Remove Profile Image
								</Button>
							</div>
						)}
					</div>

					<div
						className="flex flex-col justify-center  items-center 
        md:flex-row md:justify-between md:mx-0 md:items-start"
					>
						<div className="w-full mx-5 max-[538px]:w-max">
							<Custominput
								name="username"
								type="text"
								lable="Username"
								required
								placeholder="Username"
								value={formData.username}
								disabled={isPending}
								maxLength={20}
							/>
							<Custominput
								name="email"
								type="email"
								lable='Email'
								required
								placeholder="Email"
								value={formData.email}
								validations="isEmail"
								validationError="This is not a valid Email"
								disabled={isPending}
							/>
							<Custominput
								name="password"
								type="text"
								placeholder="Password"
								lable="Password"
								value={formData.password}
								validationError=""
								disabled={isPending}
							/>
							<Custominput
								name="newPassword"
								type="text"
								placeholder="New Password"
								lable="Confirm Password"
								value={formData.newPassword}
								validationError=""
								disabled={isPending}
							/>
							<CountryInput
								disabled={isPending}
								name="country"
								lable='Country'
								value={formData.country}
								selected={formData.country}
								onSelect={(code) => {
									setFormData((prev) => ({
										...prev,
										country: code,
									}));
								}}
							/>
						</div>
						<div className="w-full mx-3 md:my-0 my-4 max-[538px]:w-max">
							<PhoneNumberInput
								lable="Phone Number"
								name="number"
								value={formData.number}
								onChange={(phone, country) => {
									setFormData((prev) => {
										return {
											...prev,
											number: `${country.countryCode},${phone}`,
										};
									});
								}}
							/>

							<Custominput
								name="linkedIn"
								type="url"
								lable="LinkedIn Profile"
								placeholder="LinkedIn Profile "
								value={formData.linkedIn}
								validationError=""
								disabled={isPending}
							/>
							<Custominput
								name="facebook"
								lable="FaceBook Profile"
								type="url"
								placeholder="Facebook Profile"
								value={formData.facebook}
								validationError=""
								disabled={isPending}
							/>
							<Custominput
								name="X"
								type="url"
								lable="X Profile"
								placeholder="X Profile "
								value={formData.X}
								validationError=""
								disabled={isPending}
							/>
							<TimeZoneInput
							lable="Timezone"
								name="timezone"
								value={formData.timezone}
								onChange={(timezone) =>
									setFormData((prev) => ({ ...prev, timezone }))
								}
							/>
						</div>
					</div>

					<div className="my-3">
						{error && <FormError message={error} />}
						{success && <FormSuccess message={success} />}
					</div>
					<div className="flex justify-center mt-5">
						<Button variant={"primary"} size="lg" disabled={isPending}>
							Save Changes
						</Button>
					</div>
				</div>
			</Formsy>
		</div>
	);
};

export default Editprofile;
