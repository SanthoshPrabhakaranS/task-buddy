import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '../../../utils/utils';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  chevronColor?: string;
  isAccordionOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  className,
  chevronColor,
  isAccordionOpen,
}) => {
  const [isOpen, setIsOpen] = useState(isAccordionOpen || false);

  return (
    <div className='w-full border rounded-[15px] mt-2 relative'>
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full h-[46px] p-4 bg-gray-100 hover:bg-gray-200 text-left font-semibold flex justify-between items-center',
          isOpen ? 'rounded-t-[15px]' : 'rounded-[15px]',
          className
        )}
      >
        <span>{title}</span>
        <span>
          {isOpen ? (
            <ChevronUp color={chevronColor} />
          ) : (
            <ChevronDown color={chevronColor} />
          )}
        </span>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className='py-4 bg-lightGray rounded-b-[15px]'>{children}</div>
      )}
    </div>
  );
};

export default Accordion;
