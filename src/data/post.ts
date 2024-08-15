import { db } from "@/lib/db";

export const getAllTribePosts = async (
	tribeId: string,
	currentUserId?: string,
) => {
	try {
		const posts = await db.post.findMany({
			where: { tribeId, approved: true },
			include: {
				author: {
					include:{
						accounts:true
					}
				},
				comments: {
					orderBy: {
						createdAt: "desc",
					},
					include: {
						author: {
							include:{
								accounts:true
							}
						},
						likes: { include: { user: true } },
						replies: {
							include: {
								author:{
									include:{
										accounts:true
									}
								},
								likes: { include: { user: true } },
								replies: {
									include: { author: {
										include:{
											accounts:true
										}
									}, likes: { include: { user: true } } },
								},
							},
						},
					},
				},
				likes: { include: { user: true } },
				tribe: {
					include: {
						users: true,
						tribeVisit: { where: { userId: currentUserId } },
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		return posts;
	} catch (error) {
		throw error;
	}
};
export const getAllUserPosts = async (
	authorId: string,
	currentUserId: string,
) => {
	try {
		const posts = await db.post.findMany({
			where: { authorId, approved: true },
			include: {
				author: {
					include:{
						accounts:true
					}
				},
				comments: {
					orderBy: {
						createdAt: "desc",
					},
					include: {
						author: {
							include:{
								accounts:true
							}
						},

						likes: { include: { user: true } },
						replies: {
							include: {
								author: {
									include:{
										accounts:true
									}
								},
								likes: { include: { user: true } },
								replies: {
									include: { author:{
										include:{
											accounts:true
										}
									}, likes: { include: { user: true } } },
								},
							},
						},
					},
				},
				likes: { include: { user: true } },
				tribe: {
					include: {
						users: true,
						tribeVisit: {
							where: { userId: currentUserId },
						},
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		return posts;
	} catch (error) {
		throw error;
	}
};
export const getPostById = async (postId: string) => {
	try {
		const post = db.post.findUnique({
			where: { id: postId },
			include: { author: true },
		});
		return post;
	} catch (error: any) {
		console.error("Getting post by ID error>>", error.message);
	}
};
export const getPostEditById = async (postEditId: string) => {
	try {
		const postEdit = db.postEdit.findUnique({
			where: { id: postEditId },
			include: {
				post: true,
			},
		});
		return postEdit;
	} catch (error: any) {
		console.error("Post Edit getting Error>>", error.message);
	}
};

export const getAllTribeNewPosts = async (
	tribeId: string,
	userlastVisit: Date,
) => {
	try {
		const newPosts = await db.post.findMany({
			where: {
				tribeId,
				approved: true,
				createdAt: {
					gt: userlastVisit,
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		return newPosts;
	} catch (error) {
		throw error;
	}
};
