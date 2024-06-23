'use client';
import SectionHeader from '@/components/SectionHeader';

import { FaPlusCircle } from 'react-icons/fa';

const TodoList = () => {
  return (
    <div>
      <SectionHeader
        name="Your Todo List"
        buttonLink="/create-task"
        buttonTitle="Create Task"
        buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
      />
    </div>
  );
};

export default TodoList;
