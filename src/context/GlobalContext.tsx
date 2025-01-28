import {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
} from 'react';
import { FormState, Task } from '../utils/types';

interface GlobalContextType {
  taskTitle: string;
  setTaskTitle: (taskTitle: string) => void;
  dueDate: string;
  setDueDate: (dueDate: string) => void;
  status: string;
  setStatus: (status: string) => void;
  category: string;
  setCategory: (category: string) => void;
  openCreateEditModal: boolean;
  setOpenCreateEditModal: (val: boolean) => void;
  handleModalAction: () => void;
  description: string;
  setDescription: (description: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  taskId: string;
  setTaskId: (taskId: string) => void;
  formState: FormState;
  setFormState: (formState: FormState) => void;
  handleDeleteTaskModalAction: () => void;
  setOpenDeleteTaskModal: (val: boolean) => void;
  openDeleteTaskModal: boolean;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  selectedTasks: string[];
  setSelectedTasks: (tasks: string[]) => void;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('Error using GlobalContext');
  }
  return context;
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
    setOpenCreateEditModal((prev) => !prev);
  }, []);

  const handleDeleteTaskModalAction = useCallback(() => {
    setOpenDeleteTaskModal((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
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
      setFormState,
      selectedTasks,
      setSelectedTasks,
      openCreateEditModal,
      setOpenCreateEditModal,
      handleModalAction,
      handleDeleteTaskModalAction,
      openDeleteTaskModal,
      setOpenDeleteTaskModal,
    }),
    [
      tasks,
      taskTitle,
      dueDate,
      status,
      category,
      description,
      file,
      taskId,
      formState,
      selectedTasks,
      openCreateEditModal,
      openDeleteTaskModal,
    ]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
