import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { URL_HEX, URL_LOGO } from '../utils/config';

const Header: FC = () => {
  return (
    <header className='flex justify-between py-6'>
      <a
        href={URL_HEX}
        target='_blank'
        className='  w-40 cursor-pointer transition-opacity hover:opacity-80'
      >
        <img src={URL_LOGO} className='max-w-full' alt='Hex Team. Логотип ссылки' />
      </a>
      <nav>
        <ul className='flex w-full justify-between gap-5'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => `${isActive ? 'font-medium' : ''}`}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/stats'
              className={({ isActive }) => `${isActive ? 'font-medium' : ''}`}
            >
              Статистика
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
