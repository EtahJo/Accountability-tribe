"use client";
import { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { withFormsy, FormsyInjectedProps } from "formsy-react";

interface UploadImageProps {
	presentImage?: string | null | undefined;
	submitUrl?: (val: string) => void;
	onSuccess?: () => void;
}

const UploadImage = ({
	presentImage,
	submitUrl,
	setValue,
}: UploadImageProps & FormsyInjectedProps<any>) => {
	const [resource, setResource] = useState<any>();
	const onSuccess = (imageUrl: string) => {
		setValue(imageUrl);
	};

	return (
		<div className="relative largePhone:-mt-32 -mt-16">
			<Avatar
				className=" largePhone:w-[180px] largePhone:h-[180px] z-10 items-center flex justify-center 
      m-auto border-4 border-white w-[100px] h-[100px] shadow-3xl"
			>
				{!resource && !presentImage ? (
					<AvatarFallback className="bg-black">
						<FaUser className="text-white" size={100} />
					</AvatarFallback>
				) : (
					<CldImage
						width="180"
						height="180"
						crop={"fill"}
						src={resource?.path || presentImage}
						sizes="100vw"
						alt="User profile"
					/>
				)}
			</Avatar>

			<CldUploadWidget
				signatureEndpoint={"/api/sign-image"}
				onSuccess={(result: any, { widget }) => {
					console.log("Image result",result)
					setResource(result?.info);
					onSuccess(result?.info.url);
					if (submitUrl) {
						submitUrl(result?.info.url);
					}
				}}
			>
				{({ open }) => {
					const handleClicked = () => {
						open();
					};

					return (
						<div
							onClick={handleClicked}
							className="flex w-full justify-center -mt-8 ml-10"
						>
							<div
								className="bg-purple rounded-full p-2  z-10
            hover:bg-white hover:shadow-3xl cursor-pointer  w-10 h-10 transition duration-1000 hover:-translate-y-1 transform hover:duration-300 "
							>
								<AiFillCamera className="text-lightPink " size={25} />
							</div>
						</div>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default withFormsy(UploadImage);
