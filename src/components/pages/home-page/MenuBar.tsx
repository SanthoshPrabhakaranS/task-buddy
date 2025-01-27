import { FC, useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/utils';
import { assets } from '../../../assets';

interface MenuBarProps {
  activeMenu: string;
  handleMenuClick: (menu: string) => void;
}

const MenuBar: FC<MenuBarProps> = ({ activeMenu, handleMenuClick }) => {
  const [underlineStyle, setUnderlineStyle] = useState<any>({});
  const menuBarRef = useRef<HTMLDivElement>(null);

  const MenuItems = [
    {
      id: 1,
      title: 'List',
      icon: assets.ListImg,
    },
    {
      id: 2,
      title: 'Board',
      icon: assets.BoardImg,
    },
  ];

  // To set the underline style for active menu
  useEffect(() => {
    if (menuBarRef.current) {
      const activeItem = menuBarRef.current.querySelector(
        `[data-title="${activeMenu}"]`
      ) as HTMLElement;

      if (activeItem) {
        setUnderlineStyle({
          width: `${activeItem.offsetWidth}px`,
          left: `${activeItem.offsetLeft}px`,
        });
      }
    }
  }, [activeMenu]);

  return (
    <div ref={menuBarRef} className='w-full relative flex items-center gap-10'>
      {MenuItems.map((item) => {
        return (
          <div
            className={cn(
              activeMenu === item.title && 'font-semibold text-black',
              'cursor-pointer tracking-tight text-sm flex flex-row items-center gap-2 text-[16px] font-semibold text-black/60'
            )}
            onClick={() => handleMenuClick(item.title)}
            key={item.id}
            data-title={item.title}
          >
            <img
              style={{
                filter: '',
              }}
              className='w-[12px] h-[12px]'
              src={item.icon}
              alt='img'
            />
            <p
              className={cn(
                activeMenu === item.title && 'font-semibold text-black'
              )}
            >
              {item.title}
            </p>
          </div>
        );
      })}
      {/* Underline */}
      <div
        className='absolute bottom-[-2px] h-[2px] bg-black transition-all duration-300 rounded-full'
        style={underlineStyle}
      ></div>
    </div>
  );
};

export default MenuBar;
