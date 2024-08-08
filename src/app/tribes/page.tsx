import SectionHeader from "@/components/SectionHeader";
import TribesBody from "./_components/TribesBody";

const TribesPage = async () => {
	return (
		<div className="px-20 mt-16 min-[640px]:mt-0 ">
			<SectionHeader
				name="All Available Tribes"
				buttonLink="/create-tribe"
				buttonTitle="Create Tribe"
			/>
			<TribesBody />
		</div>
	);
};

export default TribesPage;
