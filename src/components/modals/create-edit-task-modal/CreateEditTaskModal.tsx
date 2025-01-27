import { FC, useCallback, useEffect } from 'react';
import { Modal } from '../../shared/modal/index';
import RichTextEditor from '../../shared/rich-text-editor/index';
import DateInput from '../../task-list/task-inputs/DateInput';
import TaskCategoryRadioInput from '../../shared/task-category-radio-input/index';
import StatusAndCategoryInput from '../../task-list/task-inputs/StatusAndCategoryInput';
import { TASK_STATUS } from '../../../utils/constants';
import { assets } from '../../../assets';
import FileInput from '../../shared/file-input/index';
import Button from '../../shared/button';
import { FormState, Task } from '../../../utils/types';
import { LoaderCircle } from 'lucide-react';
import { cn } from '../../../utils/utils';
import ActivitySection from './ActivitySection';

interface CreateEditTaskModalProps {
  tasks: Task[];
  createTask: (task: Task) => Promise<string | undefined>;
  fetchTasks: () => void;
  handleModalAction: () => void;
  description: string;
  setDescription: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  taskTitle: string;
  setTaskTitle: (value: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  editableData?: Task;
  formState?: string;
  editTask: (task: Task) => Promise<void>;
}

const CreateEditTaskModal: FC<CreateEditTaskModalProps> = ({
  tasks,
  createTask,
  fetchTasks,
  taskTitle,
  setTaskTitle,
  description,
  setDescription,
  category,
  setCategory,
  dueDate,
  setDueDate,
  status,
  setStatus,
  file,
  setFile,
  handleModalAction,
  loading,
  setLoading,
  editableData,
  formState,
  editTask,
}) => {
  const handleChange = useCallback(
    (value: string) => {
      setDescription(value);
    },
    [setDescription]
  );

  // Update the form states for edit task
  useEffect(() => {
    if (formState === FormState.EDIT && editableData) {
      setTaskTitle(editableData.title);
      setDescription(editableData.description || '');
      setCategory(editableData.category);
      setDueDate(editableData.dueOn);
      setStatus(editableData.status);
      setFile(editableData.attachment);
    } else {
      setTaskTitle('');
      setDescription('');
      setCategory('');
      setDueDate('');
      setStatus('');
      setFile(null);
    }
  }, [formState, editableData]);

  const handleCreateTask = useCallback(async () => {
    setLoading(true);
    if (formState === FormState.EDIT && editableData) {
      await editTask({
        id: editableData.id,
        title: taskTitle,
        category: category,
        dueOn: dueDate,
        status: status,
        attachment: file,
        description: description,
        activity: editableData.activity,
      });
    } else {
      await createTask({
        id: '',
        title: taskTitle,
        category: category,
        dueOn: dueDate,
        status: status,
        attachment: file,
        description: description,
      });
    }
    await fetchTasks();
    handleModalAction();
    setCategory('');
    setDueDate('');
    setStatus('');
    setFile(null);
    setTaskTitle('');
    setDescription('');
    setLoading(false);
  }, [
    taskTitle,
    description,
    category,
    dueDate,
    status,
    file,
    fetchTasks,
    createTask,
    editTask,
  ]);

  return (
    <Modal
      title={formState === FormState.EDIT ? 'Edit Task' : 'Create Task'}
      isOpen={true}
      onClose={handleModalAction}
      footer={
        <div className='w-full h-[73px] bg-lightGray flex justify-end items-center rounded-b-3xl'>
          <div className='flex flex-row items-center gap-2 px-5'>
            <Button
              onClick={handleModalAction}
              title='cancel'
              className='h-[40px] bg-white border border-black/10 text-black hover:bg-transparent'
            />
            <Button
              disabled={
                (formState != FormState.EDIT && !taskTitle) ||
                (formState != FormState.EDIT && !dueDate) ||
                (formState != FormState.EDIT && !status) ||
                (formState != FormState.EDIT && !category) ||
                (formState != FormState.EDIT && loading) ||
                loading
              }
              onClick={handleCreateTask}
              title={
                !loading
                  ? formState === FormState.EDIT
                    ? 'Update'
                    : 'Create'
                  : ''
              }
              icon={
                loading ? (
                  <LoaderCircle size={19} className='animate-spin' />
                ) : undefined
              }
              className='h-[40px] disabled:bg-primary/50 disabled:cursor-not-allowed min-w-[100px] flex justify-center items-center'
            />
          </div>
        </div>
      }
    >
      <div
        className={cn(
          'h-full w-full grid',
          formState == FormState.EDIT ? 'grid-cols-3' : 'grid-cols-1'
        )}
      >
        <div
          className={cn(
            'h-full w-full flex flex-col gap-5 p-2',
            formState == FormState.EDIT
              ? 'max-h-[470px] col-span-2 overflow-y-auto'
              : 'max-w-[680px]'
          )}
        >
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.currentTarget.value)}
            className='h-[36px] bg-lightGray p-3 rounded-md border border-black/10 placeholder:text-sm focus:outline-none'
            type='text'
            placeholder='Task title'
          />
          <RichTextEditor value={description} onChange={handleChange} />
          <div className='flex flex-row flex-wrap items-center gap-8'>
            <TaskCategoryRadioInput value={category} onChange={setCategory} />
            <DateInput
              setDueDate={setDueDate}
              dueDate={dueDate}
              label='Due on*'
              triggerClassName={cn(
                'rounded-lg text-[12px] bg-lightGray border-black/10 w-[190px] justify-between text-black/40',
                dueDate && 'text-black'
              )}
              title='DD/MM/YYYY'
              iconPosition='right'
            />
            <StatusAndCategoryInput
              label='Task Status*'
              triggerElement={
                <div className='flex flex-col gap-1'>
                  <div className='h-[36px] px-2 border-black/10 border bg-lightGray flex justify-between items-center text-[12px] text-black/40 font-semibold rounded-lg w-[190px] cursor-pointer relative'>
                    <p>Choose</p>
                    <img src={assets.ChevronDownImg} alt='' />
                  </div>
                </div>
              }
              items={TASK_STATUS}
              value={status}
              onChange={setStatus}
              contentClassName='mt-3'
            />
          </div>
          <FileInput file={file} setFile={setFile} />
        </div>

        {formState == FormState.EDIT && (
          <ActivitySection
            activities={
              tasks.find((task) => task.id === editableData?.id)?.activity || []
            }
          />
        )}
      </div>
    </Modal>
  );
};

export default CreateEditTaskModal;
