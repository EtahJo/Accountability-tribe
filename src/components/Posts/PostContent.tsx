import { Badge } from '@/components/ui/badge';

interface PostContentProps {
  postEditContent?: string;
  postContent: string;
}

const PostContent = ({ postEditContent, postContent }: PostContentProps) => {
  return (
    <div>
      {postEditContent ? (
        postEditContent === postContent ? (
          <span className="flex items-center">
            <p>{postContent}</p>
            <p className="italic">{'(No Changes made)'}</p>
          </span>
        ) : (
          <div>
            <span className="flex items-center gap-2">
              <p>{postContent}</p>
              <Badge className="">Original content</Badge>
            </span>
            <span className="flex items-center gap-2">
              <p className="">{postEditContent}</p>
              <Badge className="">Edited Content</Badge>
            </span>
          </div>
        )
      ) : (
        <p>{postContent}</p>
      )}
    </div>
  );
};

export default PostContent;
