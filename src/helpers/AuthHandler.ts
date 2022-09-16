import Cookies from 'js-cookie';

export const isLogged = () => {
    const token = Cookies.get('token');
    return token !== undefined;
}

export const doLogin = (token: string, rememberPassword = false) => {
    if(rememberPassword) {
        Cookies.set('token', token, { expires: 9999 });
    } else {
        Cookies.set('token', token);
    }
}