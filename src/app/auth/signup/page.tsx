import AuthMessage from "@/components/AuthMessage/index";
import SignUpForm from "@/components/Forms/SignUpForm";

const page = () => {
	return (
		<>
			<AuthMessage
				linkTo="/auth/login/"
				pageName="Sign Up"
				actionText="Log In"
				questionText="Already have an account?"
				tagline="Begin your journey"
			/>
			<SignUpForm />
		
		</>
	);
};

export default page;
