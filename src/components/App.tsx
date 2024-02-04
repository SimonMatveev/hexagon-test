import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import PrivateRoute from '../utils/PrivateRoute';
import { getTokenFromLS } from '../utils/functions';
import Layout from './Layout';
import Login from './Login';
import Main from './Main';
import NotFound from './NotFound';
import Preloader from './Preloader';
import Register from './Register';

const LazyStats = lazy(() => import('./Stats'));

function App() {
  const [isChecking, setIsChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsChecking(true);
    const token = getTokenFromLS();
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsChecking(false);
  }, []);

  return (
    <>
      <div className='mx-auto box-border flex min-h-full w-full max-w-6xl flex-grow flex-col px-4 text-xl text-white'>
        {!isChecking ? (
          <Routes>
            <Route element={<PrivateRoute isLoggedIn={!isLoggedIn} path='/' />}>
              <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path='/register' element={<Register />} />
            </Route>
            <Route element={<PrivateRoute isLoggedIn={isLoggedIn} path='/login' />}>
              <Route element={<Layout />}>
                <Route path='/' element={<Main />}></Route>
                <Route
                  path='/stats'
                  element={
                    <Suspense fallback={<Preloader />}>
                      <LazyStats />
                    </Suspense>
                  }
                ></Route>
              </Route>
            </Route>
            <Route path='/*' element={<NotFound />} />
          </Routes>
        ) : (
          <Preloader />
        )}
      </div>
    </>
  );
}

export default App;
