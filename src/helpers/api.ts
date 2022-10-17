import Cookies from 'js-cookie';
import qs from 'qs';
import { AdsOptionsType } from '../types/types';

const BASE: string = 'https://nodets-api-olx-production.up.railway.app';

const apiFetchPostAndPut = async (endpoint: string, body: Object, fetchMethod: string) => {
    const token = Cookies.get('token');

    const res = await fetch(BASE+endpoint, {
        method: fetchMethod,
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

const apiFetchGET = async (endpoint: string, body?: Object) => {
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

const apiFetchFormData = async (endpoint: string, body: FormData, fetchMethod: string) => {
    const token = Cookies.get('token');

    const res = await fetch(BASE+endpoint, {
        method: fetchMethod,
        headers: {            
            'Authorization': `${token !== undefined ? 'Bearer '+token : ''}`
        },
        body
    });

    const json = await res.json();

    if(json.error === 'Não autorizado') {
        window.location.href = "/signin"
        return;
    }

    return json;
}

const apiFetchDELETE = async (endpoint: string) => {
    const token = Cookies.get('token');

    const res = await fetch(BASE+endpoint, {
        method: 'DELETE',
        headers: {            
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
        const json = await apiFetchPostAndPut(
            '/user/signin',
            { email, password },
            'POST'
        );
        return json;
    },
    createUser: async (name: string, email: string, state: string, password: string) => {
        const json = await apiFetchPostAndPut(
            '/user/signup',
            { name, email, state, password },
            'POST'
        );
        return json;
    },
    getUser: async () => {
        const json = await apiFetchGET(
            '/user/me'
        );
        return json;
    },
    userUpdate: async (options: Object) => {
        const json = await apiFetchPostAndPut(
            '/user/me',
            options,
            'PUT'
        );
        return json;
    },
    userDel: async (id: string) => {
        const json = await apiFetchDELETE(
            `/user/${id}`
        );
        return json;
    },
    getStates: async () => {
        const json = await apiFetchGET('/states/list');
        return json.states;
    },
    addState: async (name: string) => {
        const json = await apiFetchPostAndPut(
            '/states/add',
            { name },
            'POST'
        );
        return json;
    },
    delState: async (id: string) => {
        const json = await apiFetchDELETE(`/states/${id}`);
        return json;
    },
    getCategory: async () => {
        const json = await apiFetchGET('/category/list');
        return json.category;
    },
    getAds: async (options: AdsOptionsType) => {
        const json = await apiFetchGET(
            '/ad/list',
            options
        );
        return json;
    },
    getAd: async (id: string) => {
        const json = await apiFetchGET(`/ad/${id}`);
        return json;
    },
    addAd: async (formData: FormData) => {
        const json = await apiFetchFormData(
            '/ad/add',
            formData,
            'POST'
        );
        return json;
    },    
    adUpdate: async (id: string, formData: FormData) => {
        const json = await apiFetchFormData(
            `/ad/${id}`,
            formData,
            'PUT'
        );
        return json;
    },    
    delAd: async (id: String) => {
        const json = await apiFetchDELETE(
            `/ad/${id}`
        );
        return json;
    }
}