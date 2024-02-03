import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSqueze } from '../api/api.queries';
import { URL_BASE } from '../utils/config';
import { REGEXP_URL } from '../utils/regExps';

const Main: FC = () => {
  const [link, setLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const fullLink = `${URL_BASE}/s/${link}`;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<{ link: string }>({ mode: 'onChange' });
  const { mutate, data, isSuccess } = useSqueze();

  const onSubmit = () => {
    const { link } = getValues();
    mutate({ link });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(fullLink);
    setIsCopied(true);
  };

  useEffect(() => {
    setTimeout(() => setIsCopied(false), 3000);
  }, [isCopied]);

  useEffect(() => {
    if (isSuccess) {
      setLink(data.short);
    }
  }, [isSuccess]);

  return (
    <section className='flex h-full flex-grow flex-col'>
      <div className='relative my-auto pb-64'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='my-auto flex justify-between gap-x-5'
        >
          <input
            className='text-black flex-grow rounded-md p-5 outline-none'
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
            <p className='text-red absolute -top-12 right-0'>{errors.link.message}</p>
          )}
        </form>
        {link && <p onClick={onCopy}>{fullLink}</p>}
        {isCopied && <span>Успешно скопировано!</span>}
      </div>
    </section>
  );
};

export default Main;
