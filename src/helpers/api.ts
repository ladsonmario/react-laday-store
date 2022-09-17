import Cookies from 'js-cookie';
import qs from 'qs';

const BASE: string = 'https://nodets-api-olx-production.up.railway.app';

const apiFetchPOST = async (endpoint: string, body: Object) => {
    const token = Cookies.get('token');

    const res = await fetch(BASE+endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token !== undefined ? 'Bearer '+token : ''}`
        },
        body: JSON.stringify(body)
    });

    const json = await res.json();

    if(json.error === 'Não autorizado') {
        window.location.href = "/signin"
        return;
    }

    return json;
}

const apiFetchGET = async (endpoint: string, body = []) => {
    const token = Cookies.get('token');

    const res = await fetch(`${BASE+endpoint}?${qs.stringify(body)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token !== undefined ? 'Bearer '+token : ''}`
        }        
    });

    const json = await res.json();

    if(json.error === 'Não autorizado') {
        window.location.href = "/signin"
        return;
    }

    return json;
}

export const useAPI = {
    login: async (email: string, password: string) => {
        const json = await apiFetchPOST(
            '/user/signin',
            { email, password }
        );
        return json;
    },
    createUser: async (name: string, email: string, state: string, password: string) => {
        const json = await apiFetchPOST(
            '/user/signup',
            { name, email, state, password }
        );
        return json;
    },
    getStates: async () => {
        const json = await apiFetchGET('/states/list');
        return json;
    }
}