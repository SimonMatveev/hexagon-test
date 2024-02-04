import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useRegister } from '../api/api.hooks';
import { IFormProps } from '../types/types';
import Form from './Form';

const FormParams: IFormProps = {
  isRegister: true,
  buttonText: 'Зарегистрироваться',
  welcomeText: 'Добро пожаловать!',
  redirect: {
    questionText: 'Уже зарегистрированы?',
    pathText: 'Войти',
    pathLink: '/login',
  },
};

interface IInputsRegister {
  username: string;
  password: string;
  passwordRepeat: string;
}

const Register: FC = () => {
  const methods = useForm<IInputsRegister>({ mode: 'onChange' });
  const { mutate, isSuccess, isPending, reset, error } = useRegister();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
      reset();
    }
  }, [isSuccess]);
  const onSubmit = () => {
    const { password, username } = methods.getValues();
    mutate({ username, password });
  };
  return (
    <FormProvider {...methods}>
      <Form
        {...FormParams}
        onSubmit={onSubmit}
        apiError={error?.message}
        isPending={isPending}
      />
    </FormProvider>
  );
};

export default Register;
