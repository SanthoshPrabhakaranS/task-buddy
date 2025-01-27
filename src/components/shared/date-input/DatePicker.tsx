import React, { useState } from 'react';

const daysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

interface DatePickerProps {
  onDateSelect: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = Array.from(
    { length: daysInMonth(year, month) },
    (_, i) => i + 1
  );
  const firstDay = getFirstDayOfMonth(year, month);

  const handleDateClick = (day: number) => {
    const newSelectedDate = new Date(year, month, day);
    setSelectedDate(newSelectedDate);
    onDateSelect(newSelectedDate);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentDate(new Date(year, newMonth, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentDate(new Date(newYear, month, 1));
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className='bg-white border rounded-lg shadow-lg p-4 w-64'>
      <div className='flex gap-3 justify-center items-center mb-4'>
        <select
          value={month}
          onChange={handleMonthChange}
          className='p-1 rounded bg-white text-black cursor-pointer focus-within:outline-none'
        >
          {months.map((monthName, index) => (
            <option key={index} value={index}>
              {monthName}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={handleYearChange}
          className='p-1 rounded bg-white text-black cursor-pointer focus-within:outline-none'
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Weekdays */}
      <div className='grid grid-cols-7 gap-1 mb-2'>
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
          <div key={day} className='text-center text-sm text-black'>
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className='grid grid-cols-7 gap-1'>
        {Array(firstDay === 0 ? 6 : firstDay - 1)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`}></div>
          ))}
        {days.map((day) => (
          <div
            key={day}
            onClick={() => handleDateClick(day)}
            className={`text-center p-1 rounded-md cursor-pointer ${
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === month &&
              selectedDate.getFullYear() === year
                ? 'bg-primary text-white'
                : 'hover:bg-gray-200'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
