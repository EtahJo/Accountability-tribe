'use client';
import { useState, useTransition, useEffect } from 'react';
import ModalWrapper from '@/components/ModalWrap/index';
import { Props } from 'react-modal';
import Formsy from 'formsy-react';
import CustomInput from '@/components/CustomInput';
import { Button } from '@/components/ui/button';
import { edit_post } from '@/action/post/edit-post';
import * as z from 'zod';
import { EditPostSchema } from '@/schemas';
import { FormError } from '@/components/Messages/Error';
import { FormSuccess } from '@/components/Messages/Success';

interface PostEditModalProps {
  postTitle: string;
  postContent: string;
  postId: string;
}
const PostEditModal = ({
  isOpen,
  onRequestClose,
  postTitle,
  postContent,
  postId,
}: Props & PostEditModalProps) => {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setError('');
    setSuccess('');
  }, []);
  const onValidSubmit = (vals: z.infer<typeof EditPostSchema>) => {
    startTransition(() => {
      edit_post(vals, postId).then((data) => {
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
    <ModalWrapper isOpen={isOpen} onRequestClose={onRequestClose}>
      <Formsy
        className="bg-white rounded-3xl shadow-3xl p-5 "
        onValidSubmit={onValidSubmit}
      >
        <h2
          className="text-center text-xl font-bold
         bg-purple rounded-md p-2 text-white my-2"
        >
          Edit Post
        </h2>
        <CustomInput
          name="title"
          value={postTitle}
          placeholder="New Title"
          required
          lable="What's your post about?"
          disabled={isPending}
        />
        <CustomInput
          lable="What's on your mind?"
          required
          name="content"
          textArea
          disabled={isPending}
          placeholder="Content update"
          value={postContent}
        />
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <div className="flex items-center justify-between gap-x-2 ">
          <Button type="submit" className="move-button" disabled={isPending}>
            {' '}
            Save Changes{' '}
          </Button>
          <Button
            type="button"
            className="move-button"
            variant="destructive"
            disabled={isPending}
            onClick={onRequestClose}
          >
            {' '}
            Discard Changes
          </Button>
        </div>
      </Formsy>
    </ModalWrapper>
  );
};

export default PostEditModal;
