import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSqueze } from '../api/api.queries';
import { BASE_URL } from '../utils/config';
import { REGEXP_URL } from '../utils/regExps';

const Main: FC = () => {
  const [link, setLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const fullLink = `${BASE_URL}/s/${link}`;
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
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className='text-black'
          {...register('link', {
            pattern: {
              value: REGEXP_URL,
              message: 'Введите валидный URL',
            },
            required: true,
          })}
        />
        <button type='submit' disabled={!isValid}>
          Сжать
        </button>
        {errors.link && <p>{errors.link.message}</p>}
      </form>
      <p onClick={onCopy}>{fullLink}</p>
      {isCopied && <span>Успешно скопировано!</span>}
    </section>
  );
};

export default Main;
