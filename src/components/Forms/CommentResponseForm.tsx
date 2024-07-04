'use client';
import * as z from 'zod';
import { useState, useTransition } from 'react';
import { CreateCommentSchema } from '@/schemas';
import Formsy from 'formsy-react';
import CustomInput from '@/components/CustomInput';
import { Button } from '@/components/ui/button';
import { FaPaperPlane } from 'react-icons/fa';
import { create_comment_response } from '@/action/create-comment-response';

const CommentResponseForm = ({ commentId }: { commentId: string }) => {
  const [comment, setComment] = useState('');
  const [isPending, startTransition] = useTransition();
  const onValidSubmit = (vals: z.infer<typeof CreateCommentSchema>) => {
    startTransition(() => {
      create_comment_response(vals, commentId).then((data) => {
        if (data.success) {
          setComment('');
        }
      });
    });
  };
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
