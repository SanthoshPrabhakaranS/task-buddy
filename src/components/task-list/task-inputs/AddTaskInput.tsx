import { CornerDownLeft, Plus } from 'lucide-react';
import { FC, useCallback, useState } from 'react';
import DateInput from './DateInput';
import StatusAndCategoryInput from './StatusAndCategoryInput';
import { CATEGORIES, TASK_STATUS } from '../../../utils/constants';
import Button from '../../shared/button';
import { useGlobalContext } from '../../../context/GlobalContext';
import useTasks from '../../hooks/useTasks';
import { Task } from '../../../utils/types';
import useGetUser from '../../hooks/useGetUser';
import { cn } from '../../../utils/utils';
import { toast } from 'sonner';

interface AddTaskInputProps {
  createTask?: (task: Task) => Promise<string | undefined>;
}

const AddTaskInput: FC<AddTaskInputProps> = ({ createTask }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchTasks } = useTasks();
  const { user } = useGetUser();

  const {
    taskTitle,
    setTaskTitle,
    dueDate,
    setDueDate,
    status,
    setStatus,
    category,
    setCategory,
  } = useGlobalContext();

  const handleOpen = useCallback(() => {
    setTaskTitle('');
    setDueDate('');
    setStatus('');
    setCategory('');
    setOpen(!open);
  }, [open, setOpen]);

  const handleCreateTask = useCallback(
    async (task: Task) => {
      if (!task.title || !task.dueOn || !task.status || !task.category) {
        toast.error('Please fill all fields');
        return;
      }
      setLoading(true);
      if (createTask) {
        await createTask({
          id: '',
          title: task.title,
          dueOn: task.dueOn,
          status: task.status,
          category: task.category,
        });
        setTaskTitle('');
        setDueDate('');
        setStatus('');
        setCategory('');
        await fetchTasks();
      }
      setLoading(false);
    },

    [createTask, setTaskTitle, setDueDate, setStatus, setCategory]
  );

  const onHandleCancel = useCallback(() => {
    setTaskTitle('');
    setDueDate('');
    setStatus('');
    setCategory('');
    handleOpen();
  }, [setCategory, setDueDate, setStatus, setTaskTitle, handleOpen]);

  return (
    <div className='hidden md:block w-full border-b border-b-black/10 '>
      <div
        onClick={handleOpen}
        className='flex flex-row items-center gap-1 pl-8 pb-3 cursor-pointer'
      >
        <Plus size={21} className='text-primary' />{' '}
        <p className='text-[14px] font-semibold text-black'>ADD TASK</p>
      </div>

      {/* Inputs */}
      {open && (
        <div
          className='grid grid-cols-4 gap-4 text-black/60 text-[15px] relative px-[3rem] border-t border-t-black/10 pt-3'
          style={{
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
          }}
        >
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            type='text'
            placeholder='Task Title'
            className='w-full h-[32px] px-2 outline-none bg-transparent text-black placeholder:text-black/60'
          />
          <DateInput setDueDate={setDueDate} dueDate={dueDate} />
          <StatusAndCategoryInput
            value={status}
            onChange={setStatus}
            items={TASK_STATUS}
          />
          <StatusAndCategoryInput
            value={category}
            onChange={setCategory}
            items={CATEGORIES}
          />
          <div className='flex flex-row items-center gap-3 mb-5'>
            <Button
              disabled={loading}
              onClick={() =>
                handleCreateTask({
                  title: taskTitle,
                  dueOn: dueDate,
                  status,
                  category,
                  id: '',
                  userId: user.uid,
                })
              }
              title='Add'
              icon={<CornerDownLeft size={15} />}
              className={cn('py-2 px-5', loading && 'cursor-not-allowed')}
            />
            <Button
              onClick={onHandleCancel}
              title='Cancel'
              className='py-2 px-5 bg-transparent text-black hover:bg-transparent'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskInput;
