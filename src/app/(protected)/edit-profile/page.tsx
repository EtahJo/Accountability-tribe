'use client';
import { useState, useTransition } from 'react';
import Formsy from 'formsy-react';
import Custominput from '@/components/Custominput/index';
import CustomCheckbox from '@/components/CustomCheckbox/index';
import { Button } from '@/components/ui/button';
import { FaUser } from 'react-icons/fa';
import { AiFillCamera } from 'react-icons/ai';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { EditProfileSchema } from '@/schemas/index';
import { editProfile } from '@/action/edit-profile';
import * as z from 'zod';

const Editprofile = () => {
  const [isPending, startTransition] = useTransition();
  const { user } = useCurrentUser();
  const [formData, setFormData] = useState({
    username: user?.username || undefined,
    email: user?.email || undefined,
    password: undefined,
    newPassword: undefined,
    rememberMe: undefined,
    number: user?.number || undefined,
    linkedIn: user?.linkedIn || undefined,
    facebook: user?.facebook || undefined,
    x: user?.x || undefined,
    image: user?.image || undefined,
    country: undefined,
    checked: false,
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const onSubmit = (vals: z.infer<typeof EditProfileSchema>) => {
    startTransition(() => {
      editProfile(vals).then((data) => {
        if (data.error) {
          console.log(data.error);
        }
        if (data.success) {
          console.log(data.success);
        }
      });
    });
  };
  return (
    <Formsy className="h-screen items-center flex " onValidSubmit={onSubmit}>
      <div className="bg-white rounded-5xl p-5 m-auto w-3/4 shadow-3xl relative">
        <div className="absolute -top-24 left-[45%]">
          <Avatar className="w-[180px] h-[180px] z-10 items-center flex justify-center m-auto">
            <AvatarImage src={user?.image || undefined} />
            <AvatarFallback className="bg-black">
              <FaUser className="text-white" size={100} />
            </AvatarFallback>
          </Avatar>
          <div
            className="bg-purple rounded-full p-2 absolute right-3 bottom-0 z-10
           hover:bg-white hover:shadow-3xl cursor-pointer"
          >
            <AiFillCamera className="text-lightPink " size={25} />
          </div>
        </div>
        <h1 className="text-center text-4xl font-bold mt-24">Edit Profile</h1>
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
              type="text"
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
            <Custominput
              name="country"
              type="text"
              placeholder="Country"
              value={formData.country}
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  country: (e.target as HTMLInputElement).value,
                }));
              }}
              validationError=""
              disabled={isPending}
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
              type="text"
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
              type="text"
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
              type="text"
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
              checked={formData.checked}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  checked: !formData.checked,
                }));
              }}
              label="Remember Me"
            />
          </div>
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
