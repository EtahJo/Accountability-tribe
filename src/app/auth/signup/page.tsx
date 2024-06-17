'use client';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import AuthMessage from '@/components/AuthMessage/index';

import Formsy from 'formsy-react';
import Custominput from '@/components/Custominput/index';
import MainButton from '@/components/Button/MainButton';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import * as z from 'zod';
import { RegisterSchema } from '@/schemas/index';
import { signup } from '@/action/signup';
import { Button } from '@/components/ui/button';
const page = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [vissible, setVissible] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const onSubmit = (vals: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      signup(vals);
    });
  };
  return (
    <>
      <AuthMessage
        linkTo="/auth/login/"
        pageName="Sign Up"
        actionText="Log In"
        questionText="Already have an account?"
        tagline="Begin your journey"
      />
      <div className="justify-center relative lg:w-3/4 w-full ">
        <div className="bg-white rounded-3xl p-10 shadow-buttonInner phone:w-96 relative">
          <h1 className="bg-lightPink rounded-full shadow-buttonInner p-4 font-bold phone:text-3xl text-center text-2xl">
            Sign Up Here
          </h1>
          <Formsy autoComplete="off" onValidSubmit={onSubmit}>
            <Custominput
              name="username"
              type="text"
              placeholder="Username"
              required
              disabled={isPending}
              value={username}
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername((e.target as HTMLInputElement).value);
              }}
              validationError="Field is required"
            />

            <Custominput
              name="email"
              type="text"
              placeholder="Email"
              required
              disabled={isPending}
              value={email}
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail((e.target as HTMLInputElement).value);
              }}
              validations="isEmail"
              validationError="This is not a valid Email"
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
            <Custominput
              name="confirmPassword"
              type={vissible ? 'text' : 'password'}
              placeholder=" Confirm Password"
              disabled={isPending}
              value={password}
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
            <div className="my-3"></div>
            <div className="w-full place-content-center m-auto">
              <Button size={'slg'} variant="primary" disabled={isPending}>
                Sign Up
              </Button>
            </div>
          </Formsy>
        </div>
      </div>
    </>
  );
};

export default page;
