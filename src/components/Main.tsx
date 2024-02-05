import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSqueze } from '../api/api.hooks';
import useCopy from '../hooks/useCopy';
import { DURATION_ANIMATION_FADE_AWAY, URL_BASE } from '../utils/config';
import { buttonize } from '../utils/functions';
import { REGEXP_URL } from '../utils/regExps';
import Popup from './Popup';

const Main: FC = () => {
  const [link, setLink] = useState('');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const fullLink = `${URL_BASE}/s/${link}`;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<{ link: string }>({ mode: 'onChange' });
  const { mutate, data, isSuccess, error: apiError, isPending } = useSqueze();
  const { isCopied, onCopy } = useCopy({
    fullLink,
    animationDuration: DURATION_ANIMATION_FADE_AWAY,
  });
  const linkWatch = watch('link');

  const handlePopupClose = () => setPopupOpen(false);

  const handleReset = () => {
    setValue('link', '');
    trigger('link');
    setLink('');
  };

  const onSubmit = () => {
    handlePopupClose();
    mutate({ link: linkWatch });
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
    <section className='relative mx-auto box-border flex h-full w-full max-w-6xl flex-grow flex-col px-4 pt-16'>
      <div className='relative my-auto flex flex-col pb-64 '>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`relative my-auto mb-6 flex flex-wrap justify-between gap-x-5 gap-y-4 sm:flex-nowrap sm:gap-y-0${!link ? ' pb-[52px]' : ''}`}
        >
          {linkWatch && (
            <button
              type='button'
              onClick={handleReset}
              className='btn-transparent absolute -top-[90px] left-0 md:-top-20'
            >
              Очистить
            </button>
          )}
          <input
            className='touche w-full flex-grow rounded-md p-5 pr-14 text-black outline-none sm:w-auto'
            {...register('link', {
              pattern: {
                value: REGEXP_URL,
                message: 'Невалидный URL',
              },
              required: true,
            })}
            placeholder='https://example.com'
            aria-label='Введите ссылку'
          />
          <button
            type='submit'
            disabled={!isValid || isPending}
            className='btn-default relative w-full sm:w-auto'
          >
            Сжать
            {isPending && (
              <span className='absolute -left-16 top-1/2 z-50 h-8 w-8 -translate-y-1/2'>
                <span className='block h-full w-full animate-spin bg-spinner bg-contain bg-center bg-no-repeat sm:w-auto'></span>
              </span>
            )}
          </button>
          {errors.link && (
            <p className='absolute -top-12 right-0 text-base text-red md:text-lg'>
              {errors.link.message}
            </p>
          )}
        </form>
        {link && (
          <div className='relative mx-auto flex w-full flex-wrap items-center gap-6 self-center sm:w-auto sm:flex-nowrap'>
            <p className='w-full shrink-0 text-center sm:w-auto sm:text-left'>
              Ваша ссылка:
            </p>
            <p
              {...buttonize(onCopy)}
              className='box-border w-full cursor-pointer overflow-hidden text-ellipsis text-nowrap rounded-md bg-white p-3 text-black transition-opacity hover:opacity-80 active:opacity-70 md:w-auto'
            >
              {fullLink}
            </p>
            {isCopied && (
              <span
                className={`${isCopied ? 'animate-fade-away ' : ''}absolute right-2 top-[60px] rounded-md bg-green-cold p-2 text-sm sm:top-1/2 sm:-translate-y-1/2`}
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
