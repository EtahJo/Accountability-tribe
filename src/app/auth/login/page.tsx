'use client';
import React, { useState, useTransition } from 'react';
import * as z from 'zod';

import CustomCheckbox from '@/components/CustomCheckbox/index';
import Custominput from '@/components/CustomInput/index';
import MainButton from '@/components/Button/MainButton';

import Formsy from 'formsy-react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';
import AuthMessage from '@/components/AuthMessage/index';
import { login } from '@/action/login';
import { LoginSchema } from '@/schemas/index';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { editProfile } from '@/action/edit-profile';
import { FormError } from '@/components/Messages/Error';

const Login = () => {
  const router = useRouter();
  const [remember, setRemember] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [vissible, setVissible] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const onSubmit = (vals: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(vals)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            editProfile({
              remember: vals.remember,
            });
            router.push('/user-home');
          }
        })
        .catch(() => setError('Something went wrong'));
    });
  };

  return (
    <>
      <AuthMessage
        linkTo="/auth/signup/"
        pageName="Login"
        actionText="Sign Up"
        questionText="First Time Here ?"
        tagline="The Journey Begins when you"
      />
      <div className="justify-center relative lg:w-3/4 w-full ">
        <div className="bg-white rounded-3xl p-10 shadow-buttonInner phone:w-96 relative">
          <h1 className="bg-lightPink rounded-full shadow-buttonInner p-4 font-bold phone:text-3xl text-center text-2xl">
            Login Here
          </h1>
          <Formsy autoComplete="off" onValidSubmit={onSubmit}>
            <Custominput
              name="email"
              type="text"
              placeholder="Email"
              required
              value={email}
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail((e.target as HTMLInputElement).value);
              }}
              validations="isEmail"
              validationError="This is not a valid Email"
              disabled={isPending}
            />
            <Custominput
              name="password"
              type={vissible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              disabled={isPending}
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword((e.target as HTMLInputElement).value);
              }}
              Icon={
                vissible ? (
                  <AiFillEyeInvisible
                    color="purple"
                    onClick={() => {
                      setVissible(false);
                    }}
                  />
                ) : (
                  <AiFillEye
                    color="purple"
                    onClick={() => {
                      setVissible(true);
                    }}
                  />
                )
              }
            />
            {/* <CustomCheckbox
              name="remember"
              value={remember}
              checked={remember}
              onChange={() => {
                setRemember((prev) => !prev);
              }}
              label="Remember Me"
            /> */}
            <div className="my-3">
              <Link
                href={'/auth/forgot-password'}
                className="text-lightPink font-bold my-5"
              >
                Forgot Password?
              </Link>
            </div>
            {error && <FormError message={error} />}
            <div className="w-full place-content-center m-auto">
              <Button size={'slg'} variant="primary" disabled={isPending}>
                Login
              </Button>
            </div>
          </Formsy>
        </div>
      </div>
    </>
  );
};

export default Login;
