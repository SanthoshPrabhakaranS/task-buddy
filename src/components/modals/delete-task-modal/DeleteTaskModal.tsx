import { FC } from 'react';
import { useGlobalContext } from '../../../context/GlobalContext';
import Button from '../../shared/button';
import { Modal } from '../../shared/modal';
import { LoaderCircle } from 'lucide-react';

interface DeleteModalProps {
  handleDeleteTask: () => void;
  loading: boolean;
}

const DeleteTaskModal: FC<DeleteModalProps> = ({
  handleDeleteTask,
  loading,
}) => {
  const { handleDeleteTaskModalAction } = useGlobalContext();
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
              onClick={handleDeleteTask}
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
          Are you sure you want to delete this task ?
        </p>
      </div>
    </Modal>
  );
};

export default DeleteTaskModal;
