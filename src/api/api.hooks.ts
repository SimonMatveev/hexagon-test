import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  ILoginResponse,
  IRegisterResponse,
  ISqueezeRequest,
  ISqueezeResponse,
  IStatisticsParams,
  IUserData,
} from '../types/types';
import { saveTokenToLS } from '../utils/functions';
import { getStatistics, login, register, squeeze } from './api.service';

export const useRegister = () =>
  useMutation<IRegisterResponse, AxiosError, IUserData>({
    mutationFn: ({ username, password }: IUserData) => register({ username, password }),
    onError: (err) => {
      console.log(err);
      if (err.response && err.response.status === 400) {
        err.message = 'Пользователь с таким именем уже существует';
      } else if (err.response && err.response.status !== 200) {
        err.message = 'Произошла ошибка, попробуйте позднее';
      }
    },
  });

export const useLogin = () =>
  useMutation<ILoginResponse, AxiosError, IUserData>({
    mutationFn: ({ username, password }: IUserData) => login({ username, password }),
    onError: (err) => {
      if (err.response && err.response.status === 400) {
        err.message = 'Пользователя с таким именем и паролем не существует';
      } else if (err.response && err.response.status !== 200) {
        err.message = 'Произошла ошибка, попробуйте позднее';
      }
    },
    onSuccess: (data) => saveTokenToLS(data),
  });

export const useSqueze = () =>
  useMutation<ISqueezeResponse, AxiosError, ISqueezeRequest>({
    mutationFn: ({ link }: ISqueezeRequest) => squeeze({ link }),
    onError: (err) => {
      if (err.response && err.response.status === 400) {
        err.message = 'Пользователя с таким именем и паролем не существует';
      } else if (err.response && err.response.status !== 200) {
        err.message = 'Произошла ошибка, попробуйте позднее';
      }
    },
  });

export const useStatistics = ({ limit, offset, order }: IStatisticsParams) =>
  useQuery({
    queryFn: () => getStatistics({ limit, offset, order }),
    queryKey: ['statistics', { limit, offset, order }],
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 10000,
  });
