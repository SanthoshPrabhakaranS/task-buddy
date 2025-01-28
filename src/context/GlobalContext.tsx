import { createContext, useCallback, useContext, useState } from 'react';
import { FormState, Task } from '../utils/types';

export const GlobalContext = createContext({
  taskTitle: '',
  setTaskTitle: (taskTitle: string) => {},
  dueDate: '',
  setDueDate: (dueDate: string) => {},
  status: '',
  setStatus: (status: string) => {},
  category: '',
  setCategory: (category: string) => {},
  openCreateEditModal: false,
  setOpenCreateEditModal: (val: boolean) => {},
  handleModalAction: () => {},
  description: '',
  setDescription: (description: string) => {},
  file: null as File | null,
  setFile: (file: File | null) => {},
  taskId: '',
  setTaskId: (taskId: string) => {},
  formState: FormState.CREATE,
  setFormState: (formState: FormState) => {},
  handleDeleteTaskModalAction: () => {},
  setOpenDeleteTaskModal: (val: boolean) => {},
  openDeleteTaskModal: false,
  tasks: [] as Task[],
  setTasks: (tasks: Task[]) => {},
  selectedTasks: [] as string[],
  setSelectedTasks: (tasks: string[]) => {},
});

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [openCreateEditModal, setOpenCreateEditModal] =
    useState<boolean>(false);
  const [openDeleteTaskModal, setOpenDeleteTaskModal] =
    useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [formState, setFormState] = useState<FormState>(FormState.CREATE);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const handleModalAction = useCallback(() => {
    setOpenCreateEditModal(!openCreateEditModal);
  }, [openCreateEditModal, setOpenCreateEditModal]);

  const handleDeleteTaskModalAction = useCallback(() => {
    setOpenDeleteTaskModal(!openDeleteTaskModal);
  }, [openDeleteTaskModal, setOpenDeleteTaskModal]);

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        setTasks,
        taskTitle,
        setTaskTitle,
        dueDate,
        setDueDate,
        status,
        setStatus,
        category,
        setCategory,
        description,
        setDescription,
        file,
        setFile,
        taskId,
        setTaskId,
        formState,
        selectedTasks,
        setSelectedTasks,
        setFormState,
        openCreateEditModal,
        setOpenCreateEditModal,
        handleModalAction,
        handleDeleteTaskModalAction,
        openDeleteTaskModal,
        setOpenDeleteTaskModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
