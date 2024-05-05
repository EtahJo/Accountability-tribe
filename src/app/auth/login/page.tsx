import React from 'react';

const Login = () => {
  return (
    <div>
      <div>
        <div className="relative">
          <div className="before:block before:absolute before:bg-purple before:skew-y-12 before:rounded-full before:shadow-buttonInner inline-block p-12 before:inset-1 relative ">
            <span className="text-white text-5xl relative text-center place-content-center">
              <p className="w-72 p-5 font-bold">
                The Journey Begins when you
                <p className="text-black mt-3">log In</p>
              </p>
            </span>
          </div>
        </div>
        <div className="block mt-10">
          <div className="after:content-['!'] bg-slate-300 rounded-full block after:ml-2 after:text-4xl after:text-white after:font-bold shadow-buttonInner p-2 w-96 text-xl">
            <span className="font-bold ml-10">
              First Time Here ?<span className="text-purple ml-2">Sign Up</span>
            </span>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Login;
