import { Skeleton } from "@/components/ui/skeleton";

const FormSkeleton = () => {
	return (
		<div
			className="w-[300px] rounded-3xl shadow-3xl p-10 m-auto
     bg-white flex flex-col items-center gap-y-5 justify-center min-[640px]:mt-0 mt-16"
		>
			{Array.from({ length: 3 }).map((_, index) => (
				<div key={index} className="flex flex-col gap-y-2">
					<Skeleton className=" w-16 h-2 bg-black" />
					<Skeleton className="bg-lighterPink rounded-3xl shadow-3xl w-[250px] h-8" />
				</div>
			))}
			<Skeleton className="bg-black rounded-2xl shadow-3xl w-[100px] h-8" />
		</div>
	);
};

export default FormSkeleton;
