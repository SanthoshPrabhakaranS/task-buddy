import { FC, ReactNode } from 'react';
import { assets } from '../../../assets';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      {/* Modal Container */}
      <div className='bg-white rounded-3xl w-auto mx-auto shadow-lg'>
        {/* Modal Header */}
        <div className='flex justify-between items-center p-4 border-b border-gray-200'>
          <h3 className='text-[24px] font-medium'>{title}</h3>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 focus:outline-none'
          >
            <img className='w-[25px]' src={assets.CloseImg} alt='close' />
          </button>
        </div>

        {/* Modal Body */}
        <div className='p-4'>{children}</div>

        {/* Modal Footer */}
        {footer && (
          <div className='rounded-b-3xl border-t border-gray-200'>{footer}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
