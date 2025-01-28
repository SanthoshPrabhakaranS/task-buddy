import { ServerOff } from 'lucide-react';
import ViewContainer from '../../view-container';
import Button from '../../shared/button';
import { useCallback } from 'react';

const ErrorPage = () => {
  const reload = useCallback(() => {
    window.location.reload();
  }, [window.location]);

  return (
    <ViewContainer>
      <div className='w-full h-full flex flex-col gap-3 justify-center items-center'>
        <ServerOff size={40} />
        <p className='text-lg font-semibold'>
          Something went wrong. Please try again!.
        </p>
        <Button onClick={reload} title='Retry' />
      </div>
    </ViewContainer>
  );
};

export default ErrorPage;
