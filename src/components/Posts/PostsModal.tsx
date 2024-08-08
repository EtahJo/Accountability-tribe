"use client";
import ModalWrapper from "../ModalWrap";
import { Props } from "react-modal";
import PostSnippet from "@/components/Posts/Post";
import { useCurrentUser } from "@/hooks/use-current-user";
import { TribeUser, Tribe, User, Like, Comment, Post } from "@prisma/client";
import NoData from "../NoData";

type SinglePost = Post & {
	tribe: Tribe & { users: TribeUser[] };
	author: User;
	likes: Like[];
	comments: Comment[];
};

interface PostsModalProps {
	posts: SinglePost[];

	newPosts?: SinglePost[];
}

const PostsModal = ({
	posts,
	newPosts,
	isOpen,
	onRequestClose,
}: Props & PostsModalProps) => {
	const { user }: any = useCurrentUser();
	return (
		<ModalWrapper
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="w-max"
			modalHeader="Shared experiences and lots more"
		>
			<div className="bg-purple p-3 rounded-3xl shadow-3xl w-[320px] relative dark:bg-dark-background">
				<p
					className="absolute top-0 right-3 font-bold m-2 "
					onClick={onRequestClose}
				>
					X
				</p>
				{
					posts.length===0 ?
				<NoData message="No Posts"/>
				:
				posts?.map(
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
					}) => (
						<div key={id} className="rounded-3xl shadow-3xl">
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
								newPosts={newPosts}
								postAuthorId={authorId}
								edited={edited}
							/>
						</div>
					),
				)}
			</div>
		</ModalWrapper>
	);
};

export default PostsModal;
