import { FC } from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
