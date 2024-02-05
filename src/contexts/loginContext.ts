import { Dispatch, SetStateAction, createContext } from 'react';

const LoginContext = createContext<Dispatch<SetStateAction<boolean>> | null>(null);

export default LoginContext;
