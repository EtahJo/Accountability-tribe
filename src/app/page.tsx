import HomePageLoggedIn from "@/components/HomePage/HomePageLoggedIn";
import HomePageLoggedOut from "@/components/HomePage/HomePageLoggedOut";
import { currentUser } from "@/lib/authentication";

const Home = async () => {
	const user: any = await currentUser();
	if (!user) return <HomePageLoggedOut />;
	return (
		<main className="">
			<HomePageLoggedIn />
		</main>
	);
};

export default Home;
