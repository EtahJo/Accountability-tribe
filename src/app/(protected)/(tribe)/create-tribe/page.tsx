'use client';
import { useState, useTransition, useContext } from 'react';
import * as z from 'zod';
import Formsy from 'formsy-react';
import Custominput from '@/components/Custominput/index';
import { create_tribe } from '@/action/create-tribe';
import UploadImage from '@/components/UploadImage/index';
import { ImageUploaderContext } from '@/context/ImageUploadContext';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/Messages/Error';
import { FormSuccess } from '@/components/Messages/Success';
import { CreateTribeSchema } from '@/schemas/index';

const CreateTribe = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();
  const { url } = useContext(ImageUploaderContext);
  const onValidSubmit = (vals: z.infer<typeof CreateTribeSchema>) => {
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
      <h1 className="text-center text-5xl font-semibold mt-5 text-shadow-lg">
        Create Tribe
      </h1>
      <div className="bg-white rounded-3xl shadow-3xl w-[400px] p-10">
        <Formsy onValidSubmit={onValidSubmit}>
          {/* <UploadImage name="profileImage" /> */}
          <Custominput
            lable="Tribe Name"
            name="name"
            required
            disabled={isPending}
            placeholder="Add Tribe Name"
            value={name}
            changeEvent={(e) => setName(e.target.value)}
          />
          <Custominput
            lable="Tribe Description"
            textArea
            disabled={isPending}
            name="description"
            placeholder="Tell people what the tribe is about"
            value={description}
            changeEvent={(e) => setDescription(e.target.value)}
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
