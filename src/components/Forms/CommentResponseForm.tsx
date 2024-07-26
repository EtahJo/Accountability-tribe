'use client';
import * as z from 'zod';
import { mutate } from 'swr';
import { useState, useTransition } from 'react';
import { CreateCommentSchema } from '@/schemas/index';
import Formsy from 'formsy-react';
import CustomInput from '@/components/CustomInput/customInput';
import { Button } from '@/components/ui/button';
import { FaPaperPlane } from 'react-icons/fa';
import { useCurrentUser } from '@/hooks/use-current-user';
import { create_comment_response } from '@/action/comment /create-comment-response';
import { toast } from 'sonner';

const CommentResponseForm = ({
  commentId,
  responding,
  setResponding,
}: {
  commentId: string;
  responding: boolean;
  setResponding: (val: boolean) => void;
}) => {
  const [comment, setComment] = useState('');
  const [isPending, startTransition] = useTransition();
  const { user }: any = useCurrentUser();
  const onValidSubmit = (vals: z.infer<typeof CreateCommentSchema>) => {
    startTransition(() => {
      create_comment_response(vals, commentId).then((data) => {
        if (data.success) {
          setComment('');
          setResponding(false);
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/posts/${data.postAuthorUsername}/${user?.id}`
          );
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/posts/${data.postTribeId}/${user.id}`
          );
        }
        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };
  if (!responding) {
    return null;
  }
  return (
    <div>
      <Formsy onValidSubmit={onValidSubmit}>
        <CustomInput
          name="content"
          value={comment}
          disabled={isPending}
          placeholder="Respond to comment (Be Positive)"
          Icon={
            <Button type="submit" disabled={isPending}>
              <FaPaperPlane />
            </Button>
          }
          inputClassNames={'p-2'}
        />
      </Formsy>
    </div>
  );
};
export default CommentResponseForm;
