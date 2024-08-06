"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const GoogleLoginButton = () => {
	const onClick = () => {
		signIn("google", {
			callbackUrl: "/",
		});
	};
	return (
		<Button
			className="flex items-center gap-x-2 rounded-2xl move-button dark:border"
			size={"slg"}
			onClick={onClick}
			type="button"
		>
			<FcGoogle size={25} />
			<p className="text-xl">Login with Google</p>
		</Button>
	);
};

export default GoogleLoginButton;
