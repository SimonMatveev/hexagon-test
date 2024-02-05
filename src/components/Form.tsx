import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { IFormProps } from '../types/types';

const Form: FC<
  IFormProps & { onSubmit: () => void; apiError?: string; isPending: boolean }
> = ({
  isRegister,
  welcomeText,
  buttonText,
  redirect: { questionText, pathText, pathLink },
  onSubmit,
  apiError,
  isPending,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useFormContext();

  const pas = watch('password');
  useEffect(() => {
    trigger('passwordRepeat');
  }, [pas]);

  return (
    <section className='mx-auto box-border flex w-full max-w-xl flex-grow flex-col justify-center px-4'>
      <h1 className='mb-8 text-center text-3xl font-bold'>{welcomeText}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='relative mb-12'>
          <label htmlFor='username' className='text-md block pb-3'>
            Логин
          </label>
          <input
            className='w-full rounded-md p-4 text-black focus:outline focus:outline-2 focus:outline-green-cold'
            placeholder='от 2 до 30 символов'
            id='username'
            autoComplete='username'
            {...register('username', {
              required: { value: true, message: 'Обязательное поле' },
              minLength: {
                value: isRegister ? 2 : 0,
                message: 'Имя не короче 2 символов',
              },
              maxLength: {
                value: isRegister ? 30 : Infinity,
                message: 'Имя не длиннее 30 символов',
              },
            })}
          />
          {errors.username && (
            <p className='sm:text-md absolute -bottom-8 right-0 text-base text-red'>
              {errors.username.message as string}
            </p>
          )}
        </fieldset>
        <fieldset className='relative mb-12'>
          <label htmlFor='password' className='text-md block pb-3'>
            Пароль
          </label>
          <input
            className='w-full rounded-md p-4 text-black focus:outline focus:outline-2 focus:outline-green-cold'
            placeholder='от 2 до 30 символов'
            id='password'
            type='password'
            autoComplete={isRegister ? 'new-password' : 'password'}
            {...register('password', {
              required: { value: true, message: 'Обязательное поле' },
              minLength: {
                value: isRegister ? 2 : 0,
                message: 'Пароль не короче 2 символов',
              },
              maxLength: {
                value: isRegister ? 30 : Infinity,
                message: 'Пароль не длиннее 30 символов',
              },
            })}
          />
          {errors.password && (
            <p className='sm:text-md absolute -bottom-8 right-0 text-base text-red'>
              {errors.password.message as string}
            </p>
          )}
        </fieldset>
        {isRegister && (
          <fieldset className='relative'>
            <label htmlFor='passwordRepeat' className='text-md block pb-3'>
              Пароль ещё раз
            </label>
            <input
              className='w-full rounded-md p-4 text-black focus:outline focus:outline-2 focus:outline-green-cold'
              id='passwordRepeat'
              type='password'
              autoComplete='new-password'
              {...register('passwordRepeat', {
                required: true,
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return 'Пароли отличаются';
                  }
                },
              })}
            />
            {errors.passwordRepeat && (
              <p className='sm:text-md absolute -bottom-8 right-0 text-base text-red'>
                {errors.passwordRepeat.message as string}
              </p>
            )}
          </fieldset>
        )}
        <div className='relative mt-28'>
          {apiError && (
            <p className='sm:text-md absolute bottom-[115px] right-0 w-full text-balance text-center text-base text-red'>
              {apiError}
            </p>
          )}
          <button
            type='submit'
            disabled={!isValid || isPending}
            className='btn-default mb-8 w-full'
          >
            {!isPending ? buttonText : 'Загрузка...'}
          </button>
        </div>
      </form>
      <div className='flex justify-center gap-4 text-sm md:text-base '>
        <p className='shrink-0'>{questionText}</p>
        <Link
          className='underline-green text-green-cold transition-colors hover:text-green-cold-hover active:text-green-cold-active'
          to={pathLink}
        >
          {pathText}
        </Link>
      </div>
    </section>
  );
};

export default Form;
