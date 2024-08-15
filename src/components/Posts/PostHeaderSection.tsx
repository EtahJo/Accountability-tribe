"use client";
import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { mutate } from "swr";
import { delete_post } from "@/action/post/delete-post";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Tribe, TribeVisit } from "@prisma/client";
import { toast } from "sonner";
import EllipsisDropdown from "@/components/EllipsisDropdown/index";
import ProfileImage from "@/components/ProfileImage/index";
import PostEditModal from "@/components/Forms/PostEditModalForm";

interface PostHeaderSectionProps {
	username: string;
	profileImage: string;
	isOAuth?:boolean;
	duration: string;
	isAdmin: boolean;
	edited: boolean;
	postAuthorId: string;
	postId: string;
	postTitle: string;
	postContent: string;
	tribe?: Tribe & { tribeVisit: TribeVisit[] };
}

const PostHeaderSection = ({
	username,
	profileImage,
	duration,
	isAdmin,
	edited,
	postAuthorId,
	postId,
	postTitle,
	postContent,
	tribe,
	isOAuth
}: PostHeaderSectionProps) => {
	const [showEdit, setShowEdit] = useState(false);
	const [isPending, startTransition] = useTransition();
	const { user }: any = useCurrentUser();
	const pathname = usePathname();
	const deletePost = () => {
		startTransition(() => {
			delete_post(postId).then((data) => {
				if (data.success) {
					toast.success(data.success);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/posts/${data.postAuthorUsername}/${user?.id}`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/posts/${data.postTribeId}/${user.id}`,
					);
				}
				if (data.error) {
					toast.error(data.error);
				}
			});
		});
	};
	return (
		<div className="flex justify-between ">
			<div className="flex items-start gap-x-2">
				<div className="flex flex-col gap-y-2">
					<Link
						className="flex items-center gap-2 cursor-pointer"
						href={`/user/${username}`}
					>
						<div className="flex flex-col justify-center largePhone:items-start relative items-center">
							<ProfileImage
								image={profileImage}
								alt="Author profile image"
								dimensions="largePhone:w-[50px] largePhone:h-[50px] w-[30px] h-[30px]"
								isOAuth={isOAuth}
							/>
							{isAdmin && (
								<Badge className="largePhone:text-[8px] text-lightPink mt-2 text-[6px]  ">
									Admin
								</Badge>
							)}
						</div>

						<div className="phone:text-base text-xs">
							<p className="font-bold largePhone:text-xl text-sm">{username}</p>
							<p className="largePhone:text-base text-xs">{duration}</p>
							{edited && <p className=" text-sm  opacity-30 ">Edited</p>}
						</div>
					</Link>
				</div>
			</div>
			<div className="flex flex-col largePhone:items-end justify-center items-end pt-1">
				<EllipsisDropdown
					authorId={postAuthorId}
					isAdmin={isAdmin}
					deleteAction={deletePost}
					isPending={isPending}
					showEditFunction={() => setShowEdit(true)}
				/>
				{!pathname.startsWith("/tribe") && tribe && (
					<span className="flex items-end  lg:gap-x-1 lg:flex-row flex-col text-xs -mt-3">
						<p className="">Posted In</p>
						<Link href={`/tribe/${tribe.id}`}>
							<p className="font-bold text-lightPink mx-0 px-0 whitespace-nowrap dark:text-dark-lightPrimary">
								{tribe.name}
							</p>
						</Link>
					</span>
				)}
			</div>
			<PostEditModal
				isOpen={showEdit}
				onRequestClose={() => setShowEdit(false)}
				postContent={postContent}
				postTitle={postTitle}
				postId={postId}
			/>
		</div>
	);
};

export default PostHeaderSection;
