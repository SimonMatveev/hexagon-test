import { FC } from 'react';

const Preloader: FC = () => {
  return (
    <div className='max-w-100vw max-h-100vh flex h-full w-full flex-grow items-center justify-center'>
      <span className='bg-spinner block h-28 w-28 animate-spin bg-contain bg-center' />
    </div>
  );
};

export default Preloader;
