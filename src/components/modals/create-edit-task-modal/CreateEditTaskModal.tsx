import { FC, useCallback, useEffect, useState } from 'react';
import { Modal } from '../../shared/modal/index';
import RichTextEditor from '../../shared/rich-text-editor/index';
import DateInput from '../../task-list/task-inputs/DateInput';
import TaskCategoryRadioInput from '../../shared/task-category-radio-input/index';
import StatusAndCategoryInput from '../../task-list/task-inputs/StatusAndCategoryInput';
import {
  MODAL_TOGGLE_BUTTON_VALUES,
  TASK_STATUS,
} from '../../../utils/constants';
import { assets } from '../../../assets';
import FileInput from '../../shared/file-input/index';
import Button from '../../shared/button';
import { FormState, Task } from '../../../utils/types';
import { LoaderCircle } from 'lucide-react';
import { cn } from '../../../utils/utils';
import ActivitySection from './ActivitySection';
import useWindowWidth from '../../hooks/useWindowWidth';
import ModalNav from './ModalNav';
import TaskForm from './TaskForm';

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
  const windowWidth = useWindowWidth();
  const [toggleState, setToggleState] = useState<string>(
    MODAL_TOGGLE_BUTTON_VALUES[0].title
  );

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

  useEffect(() => {
    if (windowWidth < 1025 && formState === FormState.EDIT) {
      setToggleState(MODAL_TOGGLE_BUTTON_VALUES[0].title);
    }
  }, [windowWidth, setToggleState, formState]);

  return (
    <Modal
      title={formState === FormState.EDIT ? '' : 'Create Task'}
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
          formState == FormState.EDIT
            ? 'grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
        )}
      >
        {windowWidth < 1025 && formState === FormState.EDIT && (
          <ModalNav toggleState={toggleState} setToggleState={setToggleState} />
        )}
        {toggleState === MODAL_TOGGLE_BUTTON_VALUES[0].title && (
          <TaskForm
            category={category}
            setCategory={setCategory}
            description={description}
            dueDate={dueDate}
            file={file}
            formState={formState}
            handleChange={handleChange}
            setDueDate={setDueDate}
            setFile={setFile}
            setStatus={setStatus}
            status={status}
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
          />
        )}
        {(windowWidth > 1025 && formState == FormState.EDIT) ||
        (formState == FormState.EDIT &&
          toggleState == MODAL_TOGGLE_BUTTON_VALUES[1].title) ? (
          <ActivitySection
            activities={
              tasks.find((task) => task.id === editableData?.id)?.activity || []
            }
          />
        ) : null}
      </div>
    </Modal>
  );
};

export default CreateEditTaskModal;
