"use client";
import useSWR from "swr";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import TribeSkeleton from "@/components/Skeletons/TribeSkeleton";
import TribeSnippet from "@/components/Tribe/TribeSnippet/index";
import {Button} from '@/components/ui/button';
import Link from 'next/link'
import GotoButton from "../GoTo";
import NoData from "../NoData";

interface RecommendedTribesProps {
	userId: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const RecommendedTribesCarousel = ({ userId }: RecommendedTribesProps) => {
	const { data: recommendedTribes, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/recommended-tribes/${userId}`,
		fetcher,
	);
	if (isLoading || recommendedTribes === undefined) {
		return (
			<Carousel
				opts={{
					align: "center",
				}}
				className="w-full "
			>
				<CarouselContent className="w-full">
					{Array.from({ length: 3 }).map((_, index) => (
						<CarouselItem
							className="min-[1450px]:basis-1/3 basis-2/2 flex-col"
							key={index}
						>
							<TribeSkeleton />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		);
	}
	if (recommendedTribes?.length === 0) {
		return (
	<NoData message="No Recommended Tribes" linkTo="/create-tribe" buttonTitle="Create Tribe"/>
		);
	}

	return (
		<div className="mx-9">
			<Carousel
				opts={{
					align: "center",
				}}
				className="w-full "
			>
				<CarouselContent className="w-full">
					{recommendedTribes?.map(
						({
							id,
							name,
							description,
							profileImage,
							users,
							tribeVisit,
						}: any) => (
							<CarouselItem
								key={id}
								className="min-[1450px]:basis-1/3 basis-2/2 flex-col"
							>
								<TribeSnippet
									key={id}
									name={name}
									desc={description}
									tribeId={id}
									userId={userId}
									isMember={users.some((user: any) => user.userId === userId)}
									members={users.length}
									image={profileImage}
									lastVisit={tribeVisit[0]?.lastVisit as any}
								/>
							</CarouselItem>
						),
					)}
				</CarouselContent>

				<CarouselPrevious className="w-5 h-5 bg-lightPink text-white shadow-3xl" />
				<CarouselNext className="w-5 h-5 bg-lightPink text-white shadow-3xl" />
			</Carousel>
		</div>
	);
};

export default RecommendedTribesCarousel;
