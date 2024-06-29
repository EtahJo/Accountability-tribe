'use client';
import * as z from 'zod';
import { useState, useTransition } from 'react';
import { CreateCommentSchema } from '@/schemas';
import Formsy from 'formsy-react';
import CustomInput from '@/components/CustomInput';
import { Button } from '@/components/ui/button';
import { FaPaperPlane } from 'react-icons/fa';
import { create_comment } from '@/action/create-comment';
import { revalidatePath, revalidateTag } from 'next/cache';

const CommentForm = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState('');
  const [isPending, startTransition] = useTransition();
  const onValidSubmit = (vals: z.infer<typeof CreateCommentSchema>) => {
    startTransition(() => {
      create_comment(vals, postId).then((data) => {
        if (data.error) {
          console.log(data.error);
        }
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
          changeEvent={(e) => setComment(e.target.value)}
          placeholder="React to post (Be Positive)"
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

export default CommentForm;
