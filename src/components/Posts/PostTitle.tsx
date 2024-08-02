import { Badge } from "@/components/ui/badge";

interface PostTitleProps {
	postEditTitle?: string;
	postTitle: string;
}

const Title = ({ postTitle }: { postTitle: string }) => {
	return (
		<div className="bg-purple p-2   shadow-3xl rounded-sm ">
			<h2
				className="font-bold largePhone:text-xl text-white phone:text-lg 
      largePhone:text-start text-center text-base"
			>
				{postTitle}
			</h2>
		</div>
	);
};

const PostTitle = ({ postEditTitle, postTitle }: PostTitleProps) => {
	return (
		<div className="">
			{postTitle && (
				<div>
					{postEditTitle ? (
						postEditTitle === postTitle ? (
							<span className="flex md:items-center md:flex-row flex-col items-start ">
								<Title postTitle={postTitle} />
								<p className="italic ">{"(No Changes made)"}</p>
							</span>
						) : (
							<div>
								<span className="flex md:items-center gap-2 md:flex-row flex-col items-start">
									<Title postTitle={postTitle} />
									<Badge className="">Original content</Badge>
								</span>
								<span className="flex md:items-center gap-2 md:flex-row flex-col items-start">
									<Title postTitle={postEditTitle} />
									<Badge className="">Edited Content</Badge>
								</span>
							</div>
						)
					) : (
						<Title postTitle={postTitle} />
					)}
				</div>
			)}
		</div>
	);
};

export default PostTitle;
