import React from 'react';

const ViewContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full h-[70vh] md:h-[75vh] overflow-y-auto no-scrollbar px-[1rem] md:px-[2rem] pb-5'>
      {children}
    </div>
  );
};

export default ViewContainer;
