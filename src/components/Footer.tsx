import { FC, useContext } from 'react';
import { useNavigate } from 'react-router';
import LoginContext from '../contexts/loginContext';
import { LS_LIMIT, LS_NAME, LS_SORT_ORDER } from '../utils/config';

const Footer: FC = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useContext(LoginContext);
  const logout = () => {
    localStorage.removeItem(LS_LIMIT);
    localStorage.removeItem(LS_SORT_ORDER);
    localStorage.removeItem(LS_NAME);
    setIsLoggedIn && setIsLoggedIn(false);
    navigate('/login');
  };
  return (
    <footer className='border-t-2 border-t-white pb-8 pt-8 text-base'>
      <div className='mx-auto box-border flex w-full max-w-6xl items-center justify-between px-4'>
        <p>Глеб Орловцев. 2024</p>
        <button className='btn-transparent' onClick={logout}>
          Выйти
        </button>
      </div>
    </footer>
  );
};

export default Footer;
