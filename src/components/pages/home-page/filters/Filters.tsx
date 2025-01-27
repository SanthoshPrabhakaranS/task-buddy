import { ChevronDown } from 'lucide-react';
import Popover from '../../../shared/popover';
import { CATEGORIES } from '../../../../utils/constants';
import SearchInput from '../../../shared/search-input/SearchInput';
import Button from '../../../shared/button';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { useCallback, useState } from 'react';
import { FormState } from '../../../../utils/types';
import useTasks from '../../../hooks/useTasks';
import { cn } from '../../../../utils/utils';
import DateInput from '../../../task-list/task-inputs/DateInput';

const Filters = () => {
  const [categoryValue, setCategoryValue] = useState<string>('ALL');
  const [dueDateValue, setDueDateValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const { handleModalAction, setFormState } = useGlobalContext();
  const { handleFilterByCategoryAndDate, filterBySearch } = useTasks();
  const TEMP_CATEGORIES = [...CATEGORIES, { id: 3, title: 'ALL' }];

  const handleOpenModal = useCallback(() => {
    setFormState(FormState.CREATE);
    handleModalAction();
  }, [handleModalAction, setFormState]);

  const handleFilterByCategory = useCallback(
    (catValue: string, dateValue: string) => {
      handleFilterByCategoryAndDate(catValue, dateValue);
    },
    [handleFilterByCategoryAndDate, categoryValue, dueDateValue]
  );

  const handleFilterBySearch = useCallback(
    (value: string) => {
      filterBySearch(value);
    },
    [searchValue, filterBySearch]
  );

  return (
    <div className='flex flex-row justify-between items-center'>
      <div className='flex flex-row items-center gap-3'>
        <p className='text-[13px] font-semibold text-black/60'>Filter by:</p>
        <Popover
          trigger={
            <div className='flex flex-row justify-between items-center gap-2 border border-gray-400 rounded-[20px] p-2 text-[12px] text-black/60 font-semibold cursor-pointer h-[32px] w-[100px]'>
              {categoryValue ?? 'Category'}
              <ChevronDown size={18} />
            </div>
          }
          content={
            <div className='flex flex-col gap-2'>
              {TEMP_CATEGORIES.map((item) => {
                return (
                  <p
                    onClick={() => {
                      setCategoryValue(item.title);
                      handleFilterByCategory(
                        item.title === 'ALL' ? '' : item.title,
                        dueDateValue
                      );
                    }}
                    className={cn(
                      'text-[13px] font-semibold tracking-wide cursor-pointer',
                      categoryValue === item.title && 'text-primary'
                    )}
                    key={item.id}
                  >
                    {item.title}
                  </p>
                );
              })}
            </div>
          }
          className='rounded-[20px] bg-[#FFF9F9] border-primary/20'
        />

        <DateInput
          setDueDate={(dueDate: string) => {
            setDueDateValue(dueDate);
            handleFilterByCategory(
              categoryValue === 'ALL' ? '' : categoryValue,
              dueDate
            );
          }}
          iconPosition='right'
          triggerClassName='h-[32px] text-[12px]'
          dueDate={dueDateValue}
          resetButton={true}
        />
      </div>

      <div className='flex flex-row items-center gap-4'>
        <SearchInput
          value={searchValue}
          onChange={(value: string) => {
            setSearchValue(value);
            handleFilterBySearch(value);
          }}
        />
        <Button onClick={handleOpenModal} title='Add Task' />
      </div>
    </div>
  );
};

export default Filters;
