import { Navigate } from 'react-router-dom';
import { isLogged } from '../helpers/AuthHandler';

type Props = {
    children: JSX.Element;
}
export const PrivateRoute = ({ children }: Props) => {
    const logged: boolean = isLogged();
    const auth: boolean = !logged ? false : true;

    return auth ? children : <Navigate to="/signin" />
}