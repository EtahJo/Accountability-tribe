"use client";
import AuthMessage from "@/components/AuthMessage/index";
import LoginForm from "@/components/Forms/LoginForm";

const Login = () => {
	return (
		<>
			<AuthMessage
				linkTo="/auth/signup/"
				pageName="Login"
				actionText="Sign Up"
				questionText="First Time Here ?"
				tagline="The Journey Begins when you"
			/>
			<LoginForm/>
		</>
	);
};

export default Login;
