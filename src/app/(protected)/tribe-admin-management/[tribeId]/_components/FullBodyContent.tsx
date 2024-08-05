"use client";
import useSWR from "swr";
import TribeInfoSection from "./TribeInfoSection";
import SectionHeader from "@/components/SectionHeader";
import PostSnippet from "@/components/Posts/Post";
import PostSkeleton from "@/components/Skeletons/PostSkeleton";
import ApproveDecline from "./ApproveDecline";
import { User, Like, Comment, Post, Tribe } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const FullBodyContent = ({ tribeId }: { tribeId: string }) => {
	const { user }: any = useCurrentUser();
	const { data: postEdits, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/posts/${tribeId}/post-edits`,
		fetcher,
	);
	if (isLoading || postEdits === undefined)
		return (
			<div className="min-[640px]:mt-0 mt-16">
				{Array.from({ length: 3 }).map((_, index) => (
					<PostSkeleton key={index} />
				))}
			</div>
		);
	return (
		<div className="min-[640px]:mt-0 mt-16">
			<TribeInfoSection tribeId={tribeId} postEdits={postEdits} />
			<SectionHeader name="Posts Edits to be Approved" />
			{postEdits.length === 0 ? (
				<div className="bg-white rounded-3xl p-10 shadow-3xl">
					<p className="text-2xl font-bold text-center">
						No posts edits pending review for this tribe
					</p>
				</div>
			) : !postEdits[0].post.tribe.adminsUserIds.includes(
					user.id,
				) ? null : (
				postEdits.map(
					({
						id,
						title,
						content,
						post,
					}: Post & {
						post: Post & {
							tribe: Tribe;
							author: User;
							comments: Comment[];
							likes: Like[];
						};
					}) => (
						<div key={id}>
							<PostSnippet
								username={post.author.username as string}
								profileImage={post.author.image as string}
								postContent={post.content}
								comments={post.comments as any}
								likes={post.likes as any}
								createdAt={post.createdAt as any}
								isAdmin={post.tribe.adminsUserIds.includes(
									post.author.id as string,
								)}
								postId={post.id}
								tribe={post.tribe as any}
								postTitle={title as string}
								postAuthorId={post.authorId}
								edited={post.edited}
								postEditTitle={title as string}
								postEditContent={content as string}
								hasLiked={post.likes.some(
									(like: any) => like.user.id === user?.id,
								)}
							/>
							<ApproveDecline postEditId={id} />
						</div>
					),
				)
			)}
		</div>
	);
};

export default FullBodyContent;
