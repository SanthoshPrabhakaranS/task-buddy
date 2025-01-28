import ClipLoader from 'react-spinners/ClipLoader';

const LoadingContainer = () => {
  return (
    <div className='h-[50vh] w-full flex justify-center items-center'>
      <ClipLoader
        className='text-red'
        size={50}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default LoadingContainer;
