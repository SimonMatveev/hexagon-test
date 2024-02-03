import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLogin } from '../api/api.queries';
import { IFormProps } from '../types/types';
import Form from './Form';

const FormParams: IFormProps = {
  isRegister: false,
  buttonText: 'Войти',
  welcomeText: 'С возвращением!',
  redirect: {
    questionText: 'Ещё нет аккаунта?',
    pathText: 'Зарегистрироваться',
    pathLink: '/register',
  },
};

interface IInputsLogin {
  username: string;
  password: string;
}

interface ILoginProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login: FC<ILoginProps> = ({ setIsLoggedIn }) => {
  const methods = useForm<IInputsLogin>();
  const { mutate, isSuccess, reset, error, isPending } = useLogin();
  useEffect(() => {
    if (isSuccess) {
      setIsLoggedIn(true);
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

export default Login;
