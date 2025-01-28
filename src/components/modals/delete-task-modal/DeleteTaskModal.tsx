import { FC, useCallback } from 'react';
import { useGlobalContext } from '../../../context/GlobalContext';
import Button from '../../shared/button';
import { Modal } from '../../shared/modal';
import { LoaderCircle } from 'lucide-react';
import useTasks from '../../hooks/useTasks';

interface DeleteModalProps {
  handleDeleteTask: () => void;
  loading: boolean;
}

const DeleteTaskModal: FC<DeleteModalProps> = ({
  handleDeleteTask,
  loading,
}) => {
  const { handleDeleteTaskModalAction, selectedTasks, setSelectedTasks } =
    useGlobalContext();
  const { bulkDeleteTasks } = useTasks();

  const handleBulkDeleteTasks = useCallback(async () => {
    await bulkDeleteTasks(selectedTasks);
    handleDeleteTaskModalAction();
    setSelectedTasks([]);
  }, [selectedTasks, bulkDeleteTasks, handleDeleteTaskModalAction]);

  return (
    <Modal
      title='Delete Task'
      isOpen={true}
      onClose={handleDeleteTaskModalAction}
      footer={
        <div className='w-full h-[73px] bg-lightGray flex justify-end items-center rounded-b-3xl'>
          <div className='flex flex-row items-center gap-2 px-5'>
            <Button
              onClick={handleDeleteTaskModalAction}
              title='cancel'
              className='h-[40px] bg-white border border-black/10 text-black hover:bg-transparent'
            />
            <Button
              onClick={
                selectedTasks.length > 0
                  ? handleBulkDeleteTasks
                  : handleDeleteTask
              }
              title={!loading ? 'Delete' : ''}
              className='h-[40px]'
              icon={
                loading ? (
                  <LoaderCircle size={19} className='animate-spin' />
                ) : undefined
              }
            />
          </div>
        </div>
      }
    >
      <div className='flex flex-col gap-5 p-2 w-full max-w-[600px]'>
        <p className='font-semibold'>
          {selectedTasks.length > 0
            ? 'Are you sure you want to delete the selected tasks ?'
            : 'Are you sure you want to delete this task ?'}
        </p>
      </div>
    </Modal>
  );
};

export default DeleteTaskModal;
