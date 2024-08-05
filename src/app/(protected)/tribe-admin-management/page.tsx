import SectionHeader from "@/components/SectionHeader";
import Tribes from "./_components/Tribes";

const TribeAdminManagementPage = async () => {
	return (
		<div className="h-max min-[640px]:mt-0 mt-16">
			<div className=" flex flex-col justify-center items-center ">
				<SectionHeader name="You are admin of the following tribes" />
				<Tribes />
			</div>
		</div>
	);
};

export default TribeAdminManagementPage;
