import { assets } from '../../../assets';
import UserProfile from './UserProfile';

const Navbar = () => {
  return (
    <div className='w-full max-lg:h-[54px] max-lg:px-4 lg:p-[2rem] max-lg:bg-lighPink flex justify-between items-center sticky top-0 z-50'>
      <div className='w-full'>
        <img
          className='w-[110px] h-[110px] lg:w-[130px] lg:h-[30px]'
          src={assets.LogoBlack}
          alt='logo'
        />
      </div>

      <UserProfile />
    </div>
  );
};

export default Navbar;
