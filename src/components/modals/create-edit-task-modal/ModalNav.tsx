import { FC, useCallback } from 'react';
import { MODAL_TOGGLE_BUTTON_VALUES } from '../../../utils/constants';
import Button from '../../shared/button';
import { cn } from '../../../utils/utils';

interface ModalNavProps {
  toggleState: string;
  setToggleState: (value: string) => void;
}

const ModalNav: FC<ModalNavProps> = ({ setToggleState, toggleState }) => {
  const handleToogleState = useCallback(
    (value: string) => {
      setToggleState(value);
    },
    [setToggleState]
  );

  return (
    <div className='w-full flex flex-row items-center gap-4 mb-3 px-2 pb-5'>
      {MODAL_TOGGLE_BUTTON_VALUES.map((button) => {
        return (
          <Button
            onClick={() => handleToogleState(button.title)}
            key={button.id}
            className={cn(
              'h-[30px] bg-white border border-black/20 text-black/60 hover:text-white hover:bg-black font-semibold text-[12px]',
              toggleState === button.title && 'bg-black text-white'
            )}
            title={button.title}
          />
        );
      })}
    </div>
  );
};

export default ModalNav;
