import { useRoutes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Signin } from '../pages/Signin';
import { Signup } from '../pages/Signup';
import { NotFound } from '../pages/NotFound';
import { AdPage } from '../pages/AdPage';
import { AddAd } from '../pages/AddAd';
import { Ads } from '../pages/Ads';
import { MyAcc } from '../pages/MyAcc';
import { PrivateRoute } from '../components/HandleRoutePrivate';

export const Routes = () => {
    return useRoutes([
        {path: "/", element: <Home />},
        {path: "/signin", element: <Signin />},
        {path: "/signup", element: <Signup />},
        {path: "/ad/:id", element: <AdPage />},
        {path: "/add-ad", element: <PrivateRoute><AddAd /></PrivateRoute>},
        {path: "/ads", element: <Ads />},
        {path: "/my-acc", element: <MyAcc />},
        {path: "*", element: <NotFound />}        
    ]);
}