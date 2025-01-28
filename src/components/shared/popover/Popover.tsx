import React, { useState, useRef, useEffect, FC } from 'react';
import { cn } from '../../../utils/utils';

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  dsiabled?: boolean;
}

const Popover: FC<PopoverProps> = ({
  trigger,
  content,
  className,
  position = 'bottom',
  dsiabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the popover to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as any) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as any)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative inline-block'>
      {/* Trigger element */}
      <div
        className='relative'
        ref={triggerRef}
        onClick={() => {
          if (dsiabled) return;
          setIsOpen(!isOpen);
        }}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          ref={popoverRef}
          className={cn(
            'absolute z-50 mt-2 bg-white border border-gray-200 shadow-sm p-4',
            position === 'top' && 'bottom-0',
            position === 'bottom' && 'top-8',
            position === 'left' && 'right-0',
            position === 'right' && 'left-0',
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
