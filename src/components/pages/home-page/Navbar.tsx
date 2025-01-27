import { assets } from '../../../assets';
import UserProfile from './UserProfile';

const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center'>
      <div className='w-full'>
        <img className='w-[130px] h-[30px]' src={assets.LogoBlack} alt='logo' />
      </div>

      <UserProfile />
    </div>
  );
};

export default Navbar;
