import EditTaskForm from '@/components/Forms/EditTaskForm';
import { getTaskById } from '@/data/task';
import SectionHeader from '@/components/SectionHeader/index';

interface PresentTask {
  title: string;
  description: string;
  dueDate: Date;
  priority: number | string;
  id: string;
  status: string;
}
const EditTask = async ({ params }: { params: { taskId: string } }) => {
  const { taskId } = params;
  const task = await getTaskById(taskId);

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <SectionHeader name="Edit Task" />
      <EditTaskForm presentTask={task as PresentTask} />
    </div>
  );
};

export default EditTask;
