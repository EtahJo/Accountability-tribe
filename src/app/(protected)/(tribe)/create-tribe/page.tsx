'use client';
import { useState, useTransition, useContext } from 'react';
import * as z from 'zod';
import Formsy from 'formsy-react';
import Custominput from '@/components/CustomInput/index';
import { create_tribe } from '@/action/tribe/create-tribe';
import UploadImage from '@/components/UploadImage/index';
import { ImageUploaderContext } from '@/context/ImageUploadContext';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/Messages/Error';
import { FormSuccess } from '@/components/Messages/Success';
import { CreateTribeSchema } from '@/schemas/index';
import CustomTagsInput from '@/components/CustomTagsInput/index';

const CreateTribe = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();
  const [tags, setTags] = useState(new Set());
  const { url } = useContext(ImageUploaderContext);
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
  const onValidSubmit = (vals: z.infer<typeof CreateTribeSchema>) => {
    if (url) {
      vals.profileImage = url;
    }
    startTransition(() => {
      create_tribe(vals).then((data) => {
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
    <div className="flex justify-center items-center h-screen flex-col gap-y-4">
      <h1 className="text-center text-5xl font-semibold mb-24 text-shadow-lg">
        Create Tribe
      </h1>
      <div className="bg-white rounded-3xl shadow-3xl w-[400px] p-10">
        <Formsy onValidSubmit={onValidSubmit}>
          <UploadImage name="profileImage" />
          <Custominput
            lable="Tribe Name"
            name="name"
            required
            disabled={isPending}
            placeholder="Add Tribe Name"
            value={name}
          />
          <Custominput
            lable="Tribe Description"
            textArea
            disabled={isPending}
            name="description"
            placeholder="Tell people what the tribe is about"
            value={description}
          />
          <CustomTagsInput
            name="tags"
            lable="Select  atleast 2 Tribe Tags"
            value={tagsArray}
            addTag={addTag}
            handleRemoveFxn={handleRemove}
            availableTags={availableTags}
          />
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button
            type="submit"
            className="move-button py-3 my-3"
            size={'slg'}
            disabled={isPending}
          >
            Create Tribe
          </Button>
        </Formsy>
      </div>
    </div>
  );
};

export default CreateTribe;
