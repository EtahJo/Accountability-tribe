'use client';
import { useState, useTransition } from 'react';
import * as z from 'zod';
import { EditTribeSchema } from '@/schemas/index';
import { edit_tribe } from '@/action/tribe/edit-tribe';
import ModalWrapper from '@/components/ModalWrap';
import Formsy from 'formsy-react';
import UploadImage from '@/components/UploadImage/index';
import CustomInput from '@/components/CustomInput/index';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/Messages/Error';
import { FormSuccess } from '@/components/Messages/Success';
import CustomTagsInput from '@/components/CustomTagsInput/index';
import { Props } from 'react-modal';

interface EditTribeModalFormProps {
  tribeName: string;
  tribeDescription: string;
  tribeTags?: Set<string>;
  tribeId: string;
  profileImage: string;
}

const EditTribeModalForm = ({
  tribeDescription,
  tribeName,
  tribeTags,
  tribeId,
  isOpen,
  profileImage,
  onRequestClose,
}: Props & EditTribeModalFormProps) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();
  const [tags, setTags] = useState(tribeTags || new Set());

  const addTag = (tag: any) => {
    setTags(new Set(tags).add(tag));
  };
  const handleRemove = (item: any) => {
    const newItems = new Set(tags);
    newItems.delete(item);
    setTags(newItems);
  };
  const tagsArray = Array.from(tags);
  const availableTags = [
    {
      id: 1,
      text: 'Study',
    },
    {
      id: 2,
      text: 'Fitness',
    },
    {
      id: 3,
      text: 'Spiritual',
    },
    {
      id: 7,
      text: 'Dieting',
    },
    {
      id: 4,
      text: 'Software development',
    },

    {
      id: 5,
      text: 'Self Development',
    },
    {
      id: 6,
      text: 'Book Club',
    },
  ];

  const onValidSubmit = (vals: z.infer<typeof EditTribeSchema>) => {
    startTransition(() => {
      edit_tribe(vals, tribeId).then((data) => {
        if (data?.error) {
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
        className="bg-white rounded-3xl shadow-3xl p-5 mt-44"
        onValidSubmit={onValidSubmit}
      >
        <UploadImage name="profileImage" presentImage={profileImage} />
        <CustomInput
          lable="Tribe Name"
          name="name"
          required
          disabled={isPending}
          placeholder="Add Tribe Name"
          value={tribeName}
        />
        <CustomInput
          lable="Tribe Description"
          textArea
          disabled={isPending}
          name="description"
          placeholder="Tell people what the tribe is about"
          value={tribeDescription}
        />
        <CustomTagsInput
          name="tags"
          lable="Select  atleast 2 Tribe Tags"
          value={tagsArray}
          addTag={addTag}
          handleRemoveFxn={handleRemove}
          availableTags={availableTags}
          presentTags={tribeTags}
        />
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <div className="flex items-center justify-between mt-5">
          <Button type="submit" className="move-button">
            Save Edit
          </Button>
          <Button
            type="button"
            className="move-button bg-gray-400 hover:bg-gray-600"
            onClick={onRequestClose}
          >
            Discard Changes
          </Button>
        </div>
      </Formsy>
    </ModalWrapper>
  );
};

export default EditTribeModalForm;
