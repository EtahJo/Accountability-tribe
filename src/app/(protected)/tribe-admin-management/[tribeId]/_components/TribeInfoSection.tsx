"use client";
import useSWR from "swr";
import { useCurrentUser } from "@/hooks/use-current-user";
import Totals from "./Totals";
import TribeHeader from "./TribeHeader";
import PostSnippet from "@/components/Posts/Post";
import SectionHeader from "@/components/SectionHeader";
import PostSkeleton from "@/components/Skeletons/PostSkeleton";
import ShortHeaderSkeleton from "@/components/Skeletons/ShortHeaderSkeleton";
import { Tribe, Like, Comment, User, Post } from "@prisma/client";
import ApproveDecline from "./ApproveDecline";
import PostForm from "@/components/Forms/PostForm";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TribeInfoSection = ({
	tribeId,
	postEdits,
}: {
	tribeId: string;
	postEdits: {}[];
}) => {
	const { user }: any = useCurrentUser();
	const { data: tribeDetails, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin/${tribeId}`,
		fetcher,
	);

	if (isLoading || tribeDetails === undefined)
		return (
			<div>
				<ShortHeaderSkeleton />
				{Array.from({ length: 3 }).map((_, index) => (
					<PostSkeleton key={index} />
				))}
			</div>
		);
	if (!tribeDetails.tribeInfo.adminsUsername?.includes(user?.username)) {
		return (
			<div>
				<p>Not Authorised </p>
			</div>
		);
	}
	const { tribeInfo, tribeTotalPosts } = tribeDetails;
	const { name, description, profileImage, adminsUsername, users, posts, id } =
		tribeInfo;
	return (
		<div className="flex flex-col gap-y-5 mb-5 ">
			<div className="flex ">
				<TribeHeader
					tribeName={name}
					tribeDescription={description}
					tribeProfileImage={profileImage}
					tribeId={id}
				/>
			</div>

			<div className="flex flex-wrap items-center justify-start gap-5">
				<Totals total={users.length} propertyName="Member" />
				<Totals total={tribeTotalPosts} propertyName="Post" />
				<Totals total={adminsUsername.length} propertyName="Admin" />
				<div className="flex lg:items-center gap-2 lg:flex-row flex-col items-start">
					<Totals
						total={posts.length}
						propertyName="unapproved Post"
						button
						id="unapprovedPosts"
					/>
					<Totals
						total={postEdits.length}
						propertyName="unapproved Post Edit"
						button
						id="unapprovedPostEdits"
					/>
				</div>
			</div>
			<div>
				<PostForm tribeId={id} />
				<SectionHeader name="Posts to be Approved" />
				{posts.length === 0 ? (
					<div className="bg-white rounded-3xl p-10 shadow-3xl">
						<p className="text-2xl font-bold text-center">
							No posts pending review for this tribe
						</p>
					</div>
				) : (
					posts.map(
						({
							id,
							tribe,
							author,
							content,
							authorId,
							createdAt,
							comments,
							likes,
							title,
							edited,
						}: Post & {
							tribe: Tribe;
							author: User;
							comments: Comment[];
							likes: Like[];
						}) => (
							<div key={id}>
								<PostSnippet
									username={author.username as string}
									profileImage={author.image as string}
									postContent={content}
									comments={comments as any}
									likes={likes as any}
									createdAt={createdAt as any}
									isAdmin={adminsUsername.includes(author.username)}
									postId={id}
									tribe={tribe as any}
									postTitle={title as string}
									postAuthorId={authorId}
									edited={edited}
									hasLiked={likes.some(
										(like: any) => like.user.id === user?.id,
									)}
								/>
								<ApproveDecline postId={id} />
							</div>
						),
					)
				)}
			</div>
		</div>
	);
};

export default TribeInfoSection;
