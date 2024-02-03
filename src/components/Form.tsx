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
    <section>
      <h1>{welcomeText}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor='username'>Логин</label>
          <input
            className='text-black'
            id='username'
            autoComplete='username'
            {...register('username', {
              required: { value: true, message: 'Обязательное поле' },
              minLength: {
                value: isRegister ? 2 : 0,
                message: 'Имя не должно быть короче 2 символов',
              },
              maxLength: {
                value: isRegister ? 30 : Infinity,
                message: 'Имя не должно быть длиннее 30 символов',
              },
            })}
          />
          {errors.login && <p>{errors.login.message as string}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor='password'>Пароль</label>
          <input
            className='text-black'
            id='password'
            type='password'
            autoComplete={isRegister ? 'new-password' : 'password'}
            {...register('password', {
              required: { value: true, message: 'Обязательное поле' },
              minLength: {
                value: isRegister ? 2 : 0,
                message: 'Пароль не должен быть короче 2 символов',
              },
              maxLength: {
                value: isRegister ? 30 : Infinity,
                message: 'Пароль не должно быть длиннее 30 символов',
              },
            })}
          />
          {errors.password && <p>{errors.password.message as string}</p>}
        </fieldset>
        {isRegister && (
          <fieldset>
            <label htmlFor='passwordRepeat'>Пароль ещё раз</label>
            <input
              className='text-black'
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
            {errors.passwordRepeat && <p>{errors.passwordRepeat.message as string}</p>}
          </fieldset>
        )}
        {apiError && <p>{apiError}</p>}
        <button type='submit' disabled={!isValid || isPending}>
          {!isPending ? buttonText : 'Загрузка...'}
        </button>
      </form>
      <div>
        <p>{questionText}</p>
        <Link to={pathLink}>{pathText}</Link>
      </div>
    </section>
  );
};

export default Form;
