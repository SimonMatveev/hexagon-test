import { ILoginResponse } from '../types/types';
import { LS_NAME } from './config';

export const saveTokenToLS = (token: ILoginResponse) =>
  localStorage.setItem(LS_NAME, JSON.stringify(token));

export function getTokenFromLS(): ILoginResponse | null {
  const token = localStorage.getItem(LS_NAME);
  return token ? JSON.parse(token) : null;
}

export function getTokenString() {
  const token = getTokenFromLS();
  return `${token?.token_type} ${token?.access_token}`;
}
