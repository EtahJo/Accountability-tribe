import SectionHeader from '@/components/SectionHeader/index';
import { getSessionById, getSessionUserBySessionUserId } from '@/data/session';
import EditSessionForm from '@/components/Forms/EditSessionForm';
import { currentUser } from '@/lib/authentication';
import { Session } from '@prisma/client';

const base_url = process.env.BASE_URL;
async function getTasksData(username: string) {
  const tasksRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${username}/uncompleted`,
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
  const session = await getSessionUserBySessionUserId(sessionId, user.id);
  const tasks = await getTasksData(user?.username);
  const goodToAddTasks = tasks.filter(
    (task: any) => !session?.tasks.some((task1) => task.id === task1.taskId)
  );

  return (
    <div className=" flex flex-col h-screen items-center align-middle m-auto">
      <div className="m-auto">
        <div className="-mt-14 flex justify-center">
          <SectionHeader name="Edit Session" />
        </div>
        <EditSessionForm
          session={session?.session as Session}
          unCompletedTasks={
            session?.tasks.length === 0 ? tasks : goodToAddTasks
          }
          sessionTasks={session?.tasks as {}[]}
        />
      </div>
    </div>
  );
};

export default EditSession;
