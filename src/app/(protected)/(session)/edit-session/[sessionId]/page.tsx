import SectionHeader from '@/components/SectionHeader';
import { getSessionById, getSessionUserBySessionUserId } from '@/data/session';
import EditSessionForm from '@/components/Forms/EditSessionForm';
import { currentUser } from '@/lib/authentication';

async function getTasksData(username: string) {
  const tasksRes = await fetch(
    `http://localhost:3000/user/api/tasks/${username}/unCompleted`,
    {
      next: {
        tags: ['userUnCompletedTasks'],
      },
    }
  );
  if (!tasksRes.ok) {
    throw new Error('Failed to fetch data');
  }

  return tasksRes.json();
}

const EditSession = async ({ params }: { params: { sessionId: string } }) => {
  const { sessionId } = params;
  const user: any = await currentUser();
  // const session = await getSessionById(sessionId);
  const session = await getSessionUserBySessionUserId(sessionId, user.id);
  const tasks = await getTasksData(user?.username);
  const goodToAddTasks = tasks.filter((task: {}) =>
    session?.tasks.some((task1) => task.id !== task1.taskId)
  );

  return (
    <div className=" flex flex-col h-screen items-center align-middle m-auto">
      <div className="m-auto">
        <div className="-mt-14 flex justify-center">
          <SectionHeader name="Edit Session" />
        </div>
        <EditSessionForm
          session={session?.session}
          unCompletedTasks={
            session?.tasks.length === 0 ? tasks : goodToAddTasks
          }
          sessionTasks={session?.tasks}
        />
      </div>
    </div>
  );
};

export default EditSession;
