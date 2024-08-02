"use client";
import useSWR from "swr";
import PostSnippet from "@/components/Posts/Post";
import { useCurrentUser } from "@/hooks/use-current-user";
import SectionHeader from "@/components/SectionHeader/index";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { usePathname } from "next/navigation";
import { Tribe, TribeUser, Post, Like, User, Comment } from "@prisma/client";
import PostSkeleton from "@/components/Skeletons/PostSkeleton";

interface PostProps {
	pageUsername?: string;
	newPosts?: Post[];
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const UserPosts = ({ pageUsername, newPosts }: PostProps) => {
	const { user }: any = useCurrentUser();
	const { data: userPosts, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/posts/${pageUsername}/${user?.id}`,
		fetcher,
	);
	const pathname = usePathname();
	if (isLoading || userPosts === undefined) {
		return <PostSkeleton />;
	}

	if (userPosts?.length === 0 && pathname.startsWith("/tribe")) {
		return (
			<div className="bg-white p-2 rounded-3xl shadow-3xl">
				<p className="font-bold text-2xl text-center">
					Be the first to post in tribe
				</p>
			</div>
		);
	} else if (userPosts?.length === 0 && !pathname.startsWith("/tribe")) {
		return null;
	}
	return (
		<div>
			<SectionHeader
				name="Shared Experiences and Lots More"
				pageUsername={pageUsername}
			/>

			<Carousel
				opts={{
					align: "center",
				}}
				className="w-full"
			>
				<CarouselContent className="w-full">
					{userPosts?.map(
						({
							id,
							tribe,
							author,
							content,
							authorId,
							likes,
							comments,
							createdAt,
							title,
							edited,
						}: Post & {
							tribe: Tribe & { users: TribeUser[] };
							author: User;
							likes: Like[];
							comments: Comment[];
						}) => {
							const admin: { userId: string } | undefined = tribe?.users.find(
								(user: TribeUser) => (user.userRole = "ADMIN"),
							);
							return (
								<CarouselItem key={id} className="">
									<PostSnippet
										username={author.username as string}
										profileImage={author.image as string}
										postContent={content}
										comments={comments as any}
										likes={likes as any}
										createdAt={createdAt as any}
										isAdmin={authorId === admin?.userId}
										postId={id}
										hasLiked={likes.some(
											(like: any) => like.user.id === user?.id,
										)}
										tribe={tribe as any}
										postTitle={title as string}
										newPosts={newPosts as any}
										postAuthorId={authorId}
										edited={edited}
									/>
								</CarouselItem>
							);
						},
					)}
				</CarouselContent>
				<CarouselPrevious className="w-5 h-5 bg-purple text-white shadow-3xl" />
				<CarouselNext className="w-5 h-5 bg-purple text-white shadow-3xl" />
			</Carousel>
		</div>
	);
};

export default UserPosts;
