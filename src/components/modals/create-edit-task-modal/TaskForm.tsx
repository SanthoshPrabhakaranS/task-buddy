import { FC } from 'react';
import { cn } from '../../../utils/utils';
import { FormState } from '../../../utils/types';
import RichTextEditor from '../../shared/rich-text-editor';
import TaskCategoryRadioInput from '../../shared/task-category-radio-input';
import DateInput from '../../task-list/task-inputs/DateInput';
import StatusAndCategoryInput from '../../task-list/task-inputs/StatusAndCategoryInput';
import { assets } from '../../../assets';
import { TASK_STATUS } from '../../../utils/constants';
import FileInput from '../../shared/file-input';

interface TaskFormProps {
  formState: string | undefined;
  taskTitle: string;
  setTaskTitle: (value: string) => void;
  description: string;
  handleChange: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
}

const TaskForm: FC<TaskFormProps> = ({
  category,
  setCategory,
  description,
  dueDate,
  file,
  formState,
  handleChange,
  setDueDate,
  setFile,
  setStatus,
  status,
  taskTitle,
  setTaskTitle,
}) => {
  return (
    <div
      className={cn(
        'h-full w-full flex flex-col gap-5 px-2 pb-2',
        formState == FormState.EDIT
          ? 'max-h-[500px] md:max-h-[470px] col-span-2 overflow-y-auto'
          : 'max-w-full max-sm:max-h-[500px] max-md:overflow-y-auto no-scrollbar'
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
      <div className='flex flex-row flex-wrap items-center gap-4 sm:gap-8'>
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
          triggerClassName='flex items-center h-[36px] border border-black/10 rounded-lg p-2 w-[190px] bg-lightGray cursor-pointer text-[12px] mt-0'
          items={TASK_STATUS}
          value={status}
          onChange={setStatus}
          contentClassName='mt-3'
        />
      </div>
      <FileInput file={file} setFile={setFile} />
    </div>
  );
};

export default TaskForm;
