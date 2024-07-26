import { Badge } from '@/components/ui/badge';

interface PostTitleProps {
  postEditTitle?: string;
  postTitle: string;
}

const PostTitle = ({ postEditTitle, postTitle }: PostTitleProps) => {
  return (
    <div>
      {postTitle && (
        <div>
          {postEditTitle ? (
            postEditTitle === postTitle ? (
              <span className="flex items-center">
                <h2
                  className="font-bold text-xl
  bg-purple p-2 w-max text-white rounded-sm"
                >
                  {postTitle}
                </h2>
                <p className="italic ">{'(No Changes made)'}</p>
              </span>
            ) : (
              <div>
                <span className="flex items-center gap-2">
                  <h2
                    className="font-bold text-xl
  bg-purple p-2 w-max text-white rounded-sm"
                  >
                    {postTitle}
                  </h2>
                  <Badge className="">Original content</Badge>
                </span>
                <span className="flex items-center gap-2">
                  <h2
                    className="font-bold text-xl
  bg-purple p-2 w-max text-white rounded-sm"
                  >
                    {postEditTitle}
                  </h2>
                  <Badge className="">Edited Content</Badge>
                </span>
              </div>
            )
          ) : (
            <h2
              className="font-bold text-xl
  bg-purple p-2 w-max text-white rounded-sm"
            >
              {postTitle}
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default PostTitle;
