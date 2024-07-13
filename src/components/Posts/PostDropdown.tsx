'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { FaEllipsisH } from 'react-icons/fa';
import PostEditModal from '@/components/Forms/PostEditModalForm';
import DeleteConfirmation from '@/components/Confirmations/DeleteConfirmation';
import { Button } from '@/components/ui/button';
import { delete_post } from '@/action/post/delete-post';
import { useCurrentUser } from '@/hooks/use-current-user';
import { toast } from 'sonner';

interface PostDropdownProps {
  postTitle: string;
  postContent: string;
  postId: string;
  postAuthorId: string;
  isAdmin?: boolean;
}

const PostDropdown = ({
  postContent,
  postTitle,
  postId,
  postAuthorId,
  isAdmin,
}: PostDropdownProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { user }: any = useCurrentUser();
  const pathname = usePathname();
  const deletePost = () => {
    delete_post(postId).then((data) => {
      if (data.success) {
        toast.success(data.success);
      }
      if (data.error) {
        toast.error(data.error);
      }
    });
  };
  const isAuthor = user?.id === postAuthorId;
  const showMakeFirstConditionOne = isAdmin && pathname.startsWith('/tribe');
  const showMakeFirstConditionTwo = pathname.includes(user?.username);
  if (!isAuthor && !showMakeFirstConditionOne && !showMakeFirstConditionTwo)
    return null;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="group">
          <FaEllipsisH className="text-purple group-hover:shadow-3xl group-hover:text-black rounded-3xl" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" flex flex-col items-center">
          {isAuthor && (
            <DropdownMenuItem onClick={() => setOpenModal(true)}>
              Edit
            </DropdownMenuItem>
          )}
          {(showMakeFirstConditionOne || showMakeFirstConditionTwo) && (
            <DropdownMenuItem>Make First</DropdownMenuItem>
          )}
          <DropdownMenuItem></DropdownMenuItem>
          {isAuthor && (
            <DeleteConfirmation
              trigger={
                <Button variant={'destructive'} className="move-button">
                  Delete
                </Button>
              }
              confirmationMessage={'Are you sure you want to delete post?'}
              consequenceMessage="This action can not be undone"
              action={<Button onClick={deletePost}>Delete Anyway</Button>}
            />
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <PostEditModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        postContent={postContent}
        postTitle={postTitle}
        postId={postId}
      />
    </div>
  );
};

export default PostDropdown;
