import React from 'react';
import SectionHeader from '../SectionHeader/index';
import TribeSnippet from '../Tribe/TribeSnippet/index';
import TribeSnippetTwo from '../Tribe/TribeSnippetTwo/index';
import { AiFillPlusCircle } from 'react-icons/ai';
import Profile from '../../../public/profile-pic.jpeg';
import CompletionLevel from '../CompletionLevel/index';
import MovingText from '../MovingText/index';

const HomeLoggedIn = () => {
  return (
    <div className="pb-48 px-20">
      <div className="grid grid-cols-12 grid-rows-3 relative -my-20 m-auto">
        <div className="col-start-1 col-end-3 row-start-2 row-end-3 z-30 ml-10">
          <MovingText textOne="Build" textTwo="Your Tribe" colorDown />
        </div>
        <div className="col-start-3 col-end-5 row-start-1 row-end-3 place-content-center z-30 ml-16 ">
          <MovingText textOne="Stay" textTwo="Consistent" colorUp />
        </div>
        <div className="before:absolute bg-white h-14 w-8/12 rounded-full absolute top-[35%] before:animate-moveHori before:bg-purple before:rounded-full before:-inset-1 before:m-2" />
        <div className="col-start-6 col-end-8 row-start-2 row-end-3 z-30">
          <MovingText textOne="Be" textTwo="Accountable" colorDown />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-11 lg:col-start-1 lg:col-end-9 bg-white rounded-3xl p-6 shadow-buttonInner">
          <div className="shadow-3xl rounded-full">
            <div className="bg-white rounded-full relative p-2 shadow-buttonInner">
              <div className="absolute -top-3 left-8">
                <SectionHeader name="Your Tribes" />
              </div>
              <div className="flex overflow-scroll bg-blend-overlay">
                <TribeSnippet name="Tribe Name" members={200} />
                <TribeSnippet name="Tribe Name" members={200} />
                <TribeSnippet name="Tribe Name" members={200} />
                <TribeSnippet name="Tribe Name" members={200} />
                <TribeSnippet name="Tribe Name" members={200} />
                <TribeSnippet name="Tribe Name" members={200} />
                <TribeSnippet name="Tribe Name" members={200} />
              </div>
            </div>
          </div>
          <div className="relative bg-white rounded-3xl shadow-buttonInner p-3 mt-10">
            <div className="absolute -top-3 right-7">
              <SectionHeader name="Add Task" icon={<AiFillPlusCircle />} />
            </div>
            <div className="bg-purple rounded-2xl p-2 my-7">
              <p className="text-white font-bold uppercase text-4xl text-center">
                What needs to get done today
              </p>
            </div>
            <div>
              <CompletionLevel
                percentage="100%"
                title="Task not done"
                completed
              />
              <CompletionLevel
                percentage="30%"
                title="Task not done"
                unCompleted
              />
              <CompletionLevel
                percentage="60%"
                title="Task not done"
                unCompleted
              />
              <CompletionLevel
                percentage="90%"
                title="Task not done"
                unCompleted
                carriedOver
              />
            </div>
          </div>
        </div>
        <div className=" col-span-11 lg:col-start-9 lg:col-end-12 mt-4">
          <div className="bg-white relative rounded-full shadow-buttonInner p-4">
            <div className="absolute -top-3 left-8">
              <SectionHeader name="Keep This in Mind" />
            </div>
            <p className="pl-5">
              You have been given this mountain to show others that it can be
              moved.
            </p>
          </div>
          <div>
            <div className="mt-6">
              <p className="font-bold text-3xl text-center mb-px">
                Popular Public Tribes
              </p>
              <div className="bg-purple rounded-full h-3" />
            </div>
            <div className="bg-white rounded-3xl mt-5 p-4">
              <TribeSnippetTwo
                tribeName="Tribe Name"
                members={200}
                description="The description of the tribe, i want to check if ellipsis is working well"
                link="/"
                profileImage={Profile}
              />
              <TribeSnippetTwo
                tribeName="Tribe Name"
                members={200}
                description="The description of the tribe ..."
                link="/"
                profileImage={Profile}
              />
              <TribeSnippetTwo
                tribeName="Tribe Name"
                members={200}
                description="The description of the tribe ..."
                link="/"
                profileImage={Profile}
              />
              <TribeSnippetTwo
                tribeName="Tribe Name"
                members={200}
                description="The description of the tribe ..."
                link="/"
                profileImage={Profile}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoggedIn;
