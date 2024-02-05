import axios from 'axios';
import {
  ILoginResponse,
  IRegisterResponse,
  ISqueezeRequest,
  ISqueezeResponse,
  IStatisticsParams,
  IUserData,
} from '../types/types';
import { URL_BASE } from '../utils/config';
import { getTokenString } from '../utils/functions';

const api = axios.create({
  baseURL: `${URL_BASE}/api`,
  timeout: 10000,
  timeoutErrorMessage: 'Проблемы с подключением. Повторите попытку позднее',
  responseType: 'json',
});

export const register = async ({ username, password }: IUserData) => {
  const response = await api.post<IRegisterResponse>('/register', null, {
    params: { username, password },
  });
  return response.data;
};

export const login = async ({ username, password }: IUserData) => {
  const response = await api.post<ILoginResponse>(
    '/login',
    { username, password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const squeeze = async ({ link }: ISqueezeRequest) => {
  const response = await api.post<ISqueezeResponse>('/squeeze', null, {
    params: {
      link,
    },
    headers: {
      Authorization: getTokenString(),
    },
  });
  return response.data;
};

export const getStatistics = async ({ limit, offset, order }: IStatisticsParams) => {
  const orderParams = new URLSearchParams();
  for (const part of order) {
    orderParams.append('order', part);
  }
  const paramsString = orderParams.toString();
  const response = await api.get<ISqueezeResponse[]>(
    `/statistics?${order.length > 0 ? paramsString : ''}`,
    {
      params: { limit, offset },
      headers: {
        Authorization: getTokenString(),
      },
    }
  );
  return { data: response.data, total: response.headers['x-total-count'] };
};
