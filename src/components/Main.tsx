import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSqueze } from '../api/api.queries';
import useCopy from '../hooks/useCopy';
import { DURATION_ANIMATION_FADE_AWAY, URL_BASE } from '../utils/config';
import { REGEXP_URL } from '../utils/regExps';
import Popup from './Popup';

const Main: FC = () => {
  const [link, setLink] = useState('');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const fullLink = `${URL_BASE}/s/${link}`;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<{ link: string }>({ mode: 'onChange' });
  const { mutate, data, isSuccess, error: apiError } = useSqueze();
  const { isCopied, onCopy } = useCopy({
    fullLink,
    animationDuration: DURATION_ANIMATION_FADE_AWAY,
  });

  const handlePopupClose = () => setPopupOpen(false);

  const onSubmit = () => {
    handlePopupClose();
    const { link } = getValues();
    mutate({ link });
  };

  useEffect(() => {
    if (isSuccess) {
      setLink(data.short);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (apiError) setPopupOpen(true);
  }, [apiError]);

  return (
    <section className='relative flex h-full flex-grow flex-col'>
      <div className='relative my-auto flex flex-col pb-64 '>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='my-auto mb-6 flex justify-between gap-x-5'
        >
          <input
            className='flex-grow rounded-md p-5 text-black outline-none'
            {...register('link', {
              pattern: {
                value: REGEXP_URL,
                message: 'Введите валидный URL',
              },
              required: true,
            })}
            placeholder='https://example.com'
            aria-label='Введите ссылку'
          />
          <button type='submit' disabled={!isValid} className='btn-default'>
            Сжать
          </button>
          {errors.link && (
            <p className='absolute -top-12 right-0 text-red'>{errors.link.message}</p>
          )}
        </form>
        {link && (
          <div className='relative mx-auto flex items-center gap-6 self-center'>
            <p>Ваша ссылка:</p>
            <p
              onClick={onCopy}
              className='cursor-pointer rounded-md bg-white p-3 text-black transition-opacity hover:opacity-80 active:opacity-70'
            >
              {fullLink}
            </p>
            {isCopied && (
              <span
                className={`${isCopied ? 'animate-fade-away ' : ''}absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-green-cold p-2 text-sm`}
              >
                Cкопировано
              </span>
            )}
          </div>
        )}
      </div>
      {isPopupOpen && (
        <Popup message={apiError?.message || ''} close={handlePopupClose} />
      )}
    </section>
  );
};

export default Main;
