import { FC } from 'react';
import { cn } from '../../../utils/utils';

interface ButtonProps {
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  title,
  icon,
  onClick,
  type,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={cn(
        'rounded-full p-3 px-7 flex flex-row items-center gap-2 text-[13px] bg-primary text-white uppercase font-semibold hover:bg-primary/80 tracking-wide transition-colors',
        className
      )}
    >
      {title}
      {icon}
    </button>
  );
};

export default Button;
