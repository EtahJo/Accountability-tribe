'use client';
import { useRouter } from 'next/navigation';

interface AuthMessageProps {
  tagline: string;
  actionText: string;
  linkTo: string;
  pageName: string;
  questionText: string;
}
const AuthMessage = ({
  actionText,
  linkTo,
  pageName,
  questionText,
  tagline,
}: AuthMessageProps) => {
  const router = useRouter();
  return (
    <div className="relative place-content-center h-full">
      <div className="before:block before:absolute before:bg-purple before:skew-y-12 before:rounded-full before:shadow-buttonInner inline-block p-12 before:inset-1 relative ">
        <span className="text-white  phone:text-5xl text-3xl relative text-center place-content-center">
          <p className="phone:w-72 w-48 p-5 font-bold ">
            {' '}
            {tagline} <span className="text-black mt-3">{pageName}</span>{' '}
          </p>
        </span>
      </div>
      <div className="mt-10 relative block">
        <div className=" bg-white rounded-full shadow-buttonInner p-2 phone:w-96 text-xl w-max m-auto justify-center flex">
          <span className="font-bold ml-10">
            {questionText}
            <span
              className="text-purple ml-2 hover:underline cursor-pointer"
              onClick={() => {
                router.push(`${linkTo}`);
              }}
            >
              {actionText}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthMessage;
