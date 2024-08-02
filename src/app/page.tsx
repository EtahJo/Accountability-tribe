import HomePageLoggedIn from "@/components/HomePage/HomePageLoggedIn";
import HomePageLoggedOut from "@/components/HomePage/HomePageLoggedOut";
import { currentUser } from "@/lib/authentication";

const base_url = process.env.BASE_URL;

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
