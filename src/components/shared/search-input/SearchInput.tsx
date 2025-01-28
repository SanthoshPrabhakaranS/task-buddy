import { Search } from 'lucide-react';
import { FC } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ onChange, value }) => {
  return (
    <div className='w-full md:w-auto border border-black/20 md:border-black/60 h-[36px] px-2 rounded-full flex flex-row items-center gap-2'>
      <Search color='#979797' size={20} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type='text'
        placeholder='Search'
        className='placeholder:text-black/80 ring-0 outline-none placeholder:text-sm'
      />
    </div>
  );
};

export default SearchInput;
