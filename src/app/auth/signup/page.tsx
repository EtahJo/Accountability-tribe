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
			<div className="relative ">
				<div className="bg-white rounded-3xl p-7 shadow-buttonInner relative dark:bg-dark-lightBackground dark:border dark:border-slate-800">
					<h1 className="bg-lightPink dark:bg-dark-background rounded-full 
					shadow-buttonInner p-4 font-bold phone:text-3xl text-center text-xl w-max m-auto">
						Sign Up Here
					</h1>
					<SignUpForm />
				</div>
			</div>
		</>
	);
};

export default page;
