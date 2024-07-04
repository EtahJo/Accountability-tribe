import SectionHeader from '@/components/SectionHeader';
import CreateSessionForm from '@/components/Forms/CreateSessionForm';
import { currentUser } from '@/lib/authentication';

async function getTasksData(username: string) {
  const tasksRes = await fetch(
    `http://localhost:3000/user/api/tasks/${username}`,
    {
      next: {
        tags: ['userTasks'],
      },
    }
  );
  if (!tasksRes.ok) {
    throw new Error('Failed to fetch data');
  }

  return tasksRes.json();
}

const CreateSession = async () => {
  const user: any = await currentUser();
  const tasks = await getTasksData(user?.username);
  // console.log('Tasks are>>', tasks);
  return (
    <div className=" flex flex-col h-screen items-center align-middle m-auto">
      <div className="m-auto">
        <div className="-mt-14 flex justify-center">
          <SectionHeader name="Create A Session" />
        </div>

        <CreateSessionForm tasks={tasks} />
      </div>
    </div>
  );
};

export default CreateSession;
