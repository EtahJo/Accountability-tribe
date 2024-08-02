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
			<div className="justify-center relative lg:w-3/4 w-full ">
				<div className="bg-white rounded-3xl p-10 shadow-buttonInner phone:w-96 relative">
					<h1 className="bg-lightPink rounded-full shadow-buttonInner p-4 font-bold phone:text-3xl text-center text-2xl">
						Sign Up Here
					</h1>
					<SignUpForm />
				</div>
			</div>
		</>
	);
};

export default page;
