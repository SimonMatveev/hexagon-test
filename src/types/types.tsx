export interface IFormProps {
  isRegister: boolean;
  welcomeText: string;
  buttonText: string;
  redirect: {
    questionText: string;
    pathLink: string;
    pathText: string;
  };
}

export interface IUserData {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  token_type: string;
}

export interface IRegisterResponse {
  username: string;
}

export interface ISqueezeResponse {
  id: 0;
  short: 'string';
  target: 'string';
  counter: 0;
}

export interface ISqueezeRequest {
  link: string;
}

export enum ESort {
  ASC_SHORT = 'asc_short',
  ASC_TARGET = 'asc_target',
  ASC_COUNTER = 'asc_counter',
  DESC_SHORT = 'desc_short',
  DESC_TARGET = 'desc_target',
  DESC_COUNTER = 'desc_counter',
}

export interface IStatisticsParams {
  order: ESort[];
  offset: number;
  limit: number;
}

export interface IStatisticsResponse {
  data: ISqueezeResponse[];
  total: number;
}
