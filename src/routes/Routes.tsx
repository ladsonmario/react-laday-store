import { useRoutes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Signin } from '../pages/Signin';
import { Signup } from '../pages/Signup';
import { NotFound } from '../pages/NotFound';

export const Routes = () => {
    return useRoutes([
        {path: "/", element: <Home />},
        {path: "/signin", element: <Signin />},
        {path: "/signup", element: <Signup />},
        {path: "*", element: <NotFound />}        
    ]);
}