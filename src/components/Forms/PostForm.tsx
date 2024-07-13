'use client';
import { useState, useTransition } from 'react';
import Formsy from 'formsy-react';
import CustomInput from '@/components/CustomInput/index';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { CreatePostSchema } from '@/schemas/index';
import { create_post } from '@/action/post/create-post';
import { FormError } from '@/components/Messages/Error';
import { FormSuccess } from '@/components/Messages/Success';

const PostForm = ({ tribeId }: { tribeId: string }) => {
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const onValidSubmit = (vals: z.infer<typeof CreatePostSchema>) => {
    startTransition(() => {
      create_post(vals, tribeId).then((data) => {
        if (data.error) {
          setSuccess('');
          setError(data.error);
        }
        if (data.success) {
          setError('');
          setSuccess(data.success);
        }
      });
    });
  };
  return (
    <div className="bg-white rounded-2xl shadow-3xl p-5 mb-5 w-full">
      <Formsy onValidSubmit={onValidSubmit}>
        <CustomInput
          lable="What's your post about?"
          placeholder="My daily challenge.."
          name="title"
          required
          disabled={isPending}
          value={title}
        />
        <CustomInput
          lable="What's on your mind?"
          placeholder="I am having a challenge with.."
          name="content"
          required
          textArea
          disabled={isPending}
          value={content}
        />
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <Button
          size={'slg'}
          className="py-3 move-button"
          disabled={isPending}
          type="submit"
        >
          {isPending ? 'Creating' : 'Post'}
        </Button>
      </Formsy>
    </div>
  );
};

export default PostForm;
