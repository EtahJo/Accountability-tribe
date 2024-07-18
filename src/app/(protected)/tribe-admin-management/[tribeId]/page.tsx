import { currentUser } from '@/lib/authentication';
import TribeHeader from './_components/TribeHeader';
import Totals from './_components/Totals';
import Tribes from '../_components/Tribes';
import ApproveDecline from './_components/ApproveDecline';
import PostForm from '@/components/Forms/PostForm';
import PostSnippet from '@/components/Posts/Post';
import { Tribe, Post, User, Comment, Like } from '@prisma/client';
import SectionHeader from '@/components/SectionHeader';

const base_url = process.env.BASE_URL;
async function getTribesDetails(username: string, tribeId: string) {
  const tribes = await fetch(
    `${base_url}/user/api/tribes/${username}/user-is-tribe-admin/${tribeId}`,
    {
      next: {
        tags: ['userIsTribeAdmin'],
      },
    }
  );
  if (!tribes.ok) {
    throw new Error('Failed to fetch data');
  }
  return tribes.json();
}
async function getTribePostEdits(tribeId: string) {
  const postEdits = await fetch(
    `${base_url}/tribe/api/posts/${tribeId}/post-edits`,
    {
      next: {
        tags: ['tribePostEdits'],
      },
    }
  );
  if (!postEdits.ok) {
    throw new Error('Failed to fetch data');
  }
  return postEdits.json();
}
async function getTribesUserISAdmin(username: string) {
  const tribes = await fetch(
    `${base_url}/user/api/tribes/${username}/user-is-tribe-admin`,
    {
      next: {
        tags: ['userIsTribeAdmin'],
      },
    }
  );
  if (!tribes.ok) {
    throw new Error('Failed to fetch data');
  }
  return tribes.json();
}
const TribeManageMentPage = async ({
  params,
}: {
  params: { tribeId: string };
}) => {
  const { tribeId } = params;
  const user = await currentUser();
  const tribeDetails = await getTribesDetails(
    user?.username as string,
    tribeId
  );
  const postEdits = await getTribePostEdits(tribeId);
  const userIsAdminOfTribes = await getTribesUserISAdmin(
    user?.username as string
  );
  const showOtherTribeInfo = userIsAdminOfTribes.filter(
    (tribe: Tribe) => tribe.id !== tribeId
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
    <div className="flex flex-col gap-y-10 justify-around items-center pb-32">
      <div className="grid grid-cols-12 items-start">
        <div className="col-start-3 col-span-6 flex flex-col gap-y-5 mb-5">
          <TribeHeader
            tribeName={name}
            tribeDescription={description}
            tribeProfileImage={profileImage}
            tribeId={id}
          />
          <div className="flex flex-wrap items-center justify-start gap-5">
            <Totals total={users.length} propertyName="Member" />
            <Totals total={tribeTotalPosts} propertyName="Post" />
            <Totals total={adminsUsername.length} propertyName="Admin" />
            <Totals
              total={posts.length}
              propertyName="Unapproved Post"
              button
              id="UnapprovedPosts"
            />
            <Totals
              total={postEdits.length}
              propertyName="Unapproved Post Edit"
            />
          </div>
        </div>
        <div className="col-start-3 col-span-6">
          <PostForm tribeId={id} />
          <div className="flex flex-col gap-y-4" id="UnapprovedPosts">
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
                        (like: any) => like.user.id === user?.id
                      )}
                    />
                    <ApproveDecline postId={id} />
                  </div>
                )
              )
            )}
            <SectionHeader name="Posts Edits to be Approved" />
            {postEdits.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 shadow-3xl">
                <p className="text-2xl font-bold text-center">
                  No posts edits pending review for this tribe
                </p>
              </div>
            ) : (
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
                      isAdmin={adminsUsername.includes(post.author.username)}
                      postId={post.id}
                      tribe={post.tribe as any}
                      postTitle={title as string}
                      postAuthorId={post.authorId}
                      edited={post.edited}
                      postEditTitle={title as string}
                      postEditContent={content as string}
                      hasLiked={post.likes.some(
                        (like: any) => like.user.id === user?.id
                      )}
                    />
                    <ApproveDecline postEditId={id} />
                  </div>
                )
              )
            )}
          </div>
        </div>
        <div className="col-start-10">
          <h2 className="font-bold text-xl whitespace-nowrap">
            Other Tribes You Manage
          </h2>
          <Tribes
            tribesData={showOtherTribeInfo}
            asSideBy
            userId={user?.id as string}
          />
        </div>
      </div>
    </div>
  );
};

export default TribeManageMentPage;
