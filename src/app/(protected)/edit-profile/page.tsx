'use client';
import { useState, useTransition, useContext } from 'react';
import Formsy from 'formsy-react';
import Custominput from '@/components/Custominput/index';
import CustomCheckbox from '@/components/CustomCheckbox/index';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { EditProfileSchema } from '@/schemas/index';
import { editProfile } from '@/action/edit-profile';
import * as z from 'zod';
import UploadImage from '@/components/UploadImage/index';
import { ImageUploaderContext } from '@/context/ImageUploadContext';
import { FormError } from '@/components/Messages/Error';
import { FormSuccess } from '@/components/Messages/Success';
import CountryInput from '@/components/CountryInput/index';

const Editprofile = () => {
  const [isPending, startTransition] = useTransition();
  const { user } = useCurrentUser();
  const { url } = useContext(ImageUploaderContext);
  const [formData, setFormData] = useState({
    username: user?.username || undefined,
    email: user?.email || undefined,
    password: undefined,
    newPassword: undefined,
    remember: user?.remember || false,
    number: user?.number || undefined,
    linkedIn: user?.linkedIn || undefined,
    facebook: user?.facebook || undefined,
    x: user?.x || undefined,
    image: user?.image || undefined,
    country: undefined,
    checked: false,
  });
  console.log('Image is ', user?.image);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const onSubmit = (vals: z.infer<typeof EditProfileSchema>) => {
    vals.image = url;
    console.log(vals);
    startTransition(() => {
      editProfile(vals).then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          //   window.location.reload();
          setSuccess(data.success);
        }
      });
    });
  };
  return (
    <Formsy className="h-screen items-center flex " onValidSubmit={onSubmit}>
      <div className="bg-white rounded-5xl p-5 m-auto w-3/4 shadow-3xl relative">
        <div className="flex flex-col ">
          <UploadImage name="image" />
          {user?.image && (
            <div className="flex justify-center mt-5">
              <Button
                onClick={() => {
                  setFormData((prev) => ({ ...prev, image: undefined }));
                }}
                className=" w-36 place-content-center"
                size="sm"
              >
                Remove Profile Image
              </Button>
            </div>
          )}
        </div>

        <h1 className="text-center text-3xl font-semibold mt-5">
          Edit Profile
        </h1>
        <div className="flex justify-between">
          <div className="w-full mx-5">
            <Custominput
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  username: (e.target as HTMLInputElement).value,
                }));
              }}
              //   validations="isEmail"
              //   validationError="This is not a valid Email"
              disabled={isPending}
            />
            <Custominput
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  email: (e.target as HTMLInputElement).value,
                }));
              }}
              validations="isEmail"
              validationError="This is not a valid Email"
              disabled={isPending}
            />
            <Custominput
              name="password"
              type="text"
              placeholder="Password"
              value={formData.password}
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  password: (e.target as HTMLInputElement).value,
                }));
              }}
              validationError=""
              disabled={isPending}
            />
            <Custominput
              name="newPassword"
              type="text"
              placeholder="New Password"
              value={formData.newPassword}
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  newPassword: (e.target as HTMLInputElement).value,
                }));
              }}
              validationError=""
              disabled={isPending}
            />
            <CountryInput
              disabled={isPending}
              name="country"
              selected={formData.country}
              onSelect={(code) => {
                setFormData((prev) => ({
                  ...prev,
                  country: code,
                }));
              }}
            />
          </div>
          <div className="w-full mx-3">
            <Custominput
              name="number"
              type="text"
              placeholder="Phone Number"
              value={formData.number}
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  number: (e.target as HTMLInputElement).value,
                }));
              }}
              validationError=""
              disabled={isPending}
            />
            <Custominput
              name="linkedIn"
              type="url"
              placeholder="LinkedIn Profile "
              value={formData.linkedIn}
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  linkedIn: (e.target as HTMLInputElement).value,
                }));
              }}
              validationError=""
              disabled={isPending}
            />
            <Custominput
              name="facebook"
              type="url"
              placeholder="Facebook Profile"
              value={formData.facebook}
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  facebook: (e.target as HTMLInputElement).value,
                }));
              }}
              validationError=""
              disabled={isPending}
            />
            <Custominput
              name="x"
              type="url"
              placeholder="X Profile "
              value={formData.x}
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  x: (e.target as HTMLInputElement).value,
                }));
              }}
              validationError=""
              disabled={isPending}
            />
            <CustomCheckbox
              name="remember"
              value={formData.remember}
              checked={formData.remember}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  remember: !formData.remember,
                }));
              }}
              label="Remember Me"
            />
          </div>
        </div>
        <div className="my-3">
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
        </div>
        <div className="flex justify-center">
          <Button variant={'primary'} size="lg" disabled={isPending}>
            Save Changes
          </Button>
        </div>
      </div>
    </Formsy>
  );
};

export default Editprofile;
