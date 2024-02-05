import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { URL_HEX, URL_LOGO } from '../utils/config';

const Header: FC = () => {
  return (
    <header>
      <div className='mx-auto box-border flex w-full max-w-6xl flex-wrap justify-between gap-y-8 px-4 py-6 sm:flex-nowrap sm:gap-y-0'>
        <a
          href={URL_HEX}
          target='_blank'
          className='mx-auto w-72 cursor-pointer transition-opacity hover:opacity-80 sm:mx-0 sm:w-40'
        >
          <img src={URL_LOGO} className='max-w-full' alt='Hex Team. Логотип ссылки' />
        </a>
        <nav className='w-full sm:w-auto'>
          <ul className='flex w-full justify-between gap-5 text-base'>
            <li className='flex flex-grow'>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `${isActive ? 'underline-green text-green-cold' : ''} mx-auto text-center`
                }
              >
                Главная
              </NavLink>
            </li>
            <li className='flex flex-grow'>
              <NavLink
                to='/stats'
                className={({ isActive }) =>
                  `${isActive ? 'underline-green text-green-cold' : ''} mx-auto text-center`
                }
              >
                Статистика
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
