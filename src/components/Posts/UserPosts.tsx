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
import { Tribe, TribeUser, Post, Like, User, Comment } from "@prisma/client";
import PostSkeleton from "@/components/Skeletons/PostSkeleton";
import NoData from "../NoData";

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
	if (isLoading || userPosts === undefined) {
		return <PostSkeleton />;
	}
	return (
		<div>
			<SectionHeader
				name="Shared Experiences and Lots More"
				pageUsername={pageUsername}
			/>
			{userPosts?.length === 0?
			<NoData message="No Posts"/>
			:
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
				<CarouselPrevious className="w-5 h-5 bg-purple text-white shadow-3xl dark:bg-dark-primary" />
				<CarouselNext className="w-5 h-5 bg-purple text-white shadow-3xl dark:bg-dark-primary" />
			</Carousel>
			}
		</div>
	);
};

export default UserPosts;
