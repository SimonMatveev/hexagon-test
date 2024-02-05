import { FC } from 'react';
import { useNavigate } from 'react-router';

const NotFound: FC = () => {
  const navigate = useNavigate();
  return (
    <section className='flex flex-grow flex-col items-center justify-center'>
      <h2 className='mb-8 text-center text-4xl font-bold'>404</h2>
      <p className='mb-8 text-balance text-center text-base md:text-lg'>
        К сожалению, мы ничего не нашли
      </p>
      <button
        className='underline-green text-green-cold transition-colors hover:text-green-cold-hover active:text-green-cold-active'
        onClick={() => navigate('/')}
      >
        На главную
      </button>
    </section>
  );
};

export default NotFound;
