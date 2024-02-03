import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IPrivateRouteProps {
  isLoggedIn: boolean;
  path: string;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({ isLoggedIn, path }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to={path} />;
};
export default PrivateRoute;
