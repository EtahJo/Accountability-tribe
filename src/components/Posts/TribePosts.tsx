"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useCurrentUser } from "@/hooks/use-current-user";
import PostSnippet from "@/components/Posts/Post";
import PostSkeleton from "../Skeletons/PostSkeleton";
import PostForm from "@/components/Forms/PostForm";
import { Tribe, TribeUser, Post, Like, User, Comment, Account } from "@prisma/client";
import SectionHeader from "@/components/SectionHeader/index";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const TribePosts = ({ tribeId }: { tribeId: string }) => {
	const [currentNewPosts, setCurrentNewPosts] = useState<Post[]>([]);
	const { user }: any = useCurrentUser();
	const currentUserId = user?.id|| process.env.NEXT_PUBLIC_GUEST_USER_ID;
	const { data: tribePosts, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/posts/${tribeId}/${currentUserId}`,
		fetcher,
	);
	useEffect(() => {
		setCurrentNewPosts(tribePosts?.newPosts);
	}, []);
	if (isLoading || tribePosts === undefined) {
		return (
			<div>
				{Array.from({ length: 3 }).map((_, index) => (
					<PostSkeleton key={index} />
				))}
			</div>
		);
	}
	return (
		<div>
			<div className="flex flex-col items-center">
				<PostForm tribeId={tribeId} />
			</div>

			<SectionHeader name="Tribe Posts" />
			<div>
			{
			tribePosts?.posts.length ===0?
			<div className="bg-white rounded-3xl shadow-3xl p-5 flex justify-center my-10">
			<div>
				<p>Be the first to post in tribe</p>
			</div>
			</div>
			:
				tribePosts?.posts?.map(
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
						author: User & {accounts:Account[]};
						likes: Like[];
						comments: Comment[];
					}) => (
						<div key={id}>
							<PostSnippet
								username={author.username as string}
								profileImage={author.image as string}
								postContent={content}
								comments={comments as any}
								likes={likes as any}
								createdAt={createdAt as any}
								isAdmin={tribe.adminsUserIds.includes(
									author?.id as string,
								)}
								postId={id}
								hasLiked={likes.some((like: any) => like.user.id === user?.id)}
								tribe={tribe as any}
								postTitle={title as string}
								newPosts={currentNewPosts}
								postAuthorId={authorId}
								edited={edited}
								isOAuth={author.accounts.length>0}
							/>
						</div>
					),
				)}
			</div>
		</div>
	);
};

export default TribePosts;
