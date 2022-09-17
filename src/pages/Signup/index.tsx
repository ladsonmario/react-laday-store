import { ChangeEvent, SyntheticEvent, useState, useEffect } from 'react';
import { PageContainer, PageTitle } from '../../components/MainComponents';
import { Error } from '../../components/partials/Error';
import { doLogin } from '../../helpers/AuthHandler';
import * as C from './styles';
import { useAPI } from '../../helpers/api';
import { StatesType } from '../../types/types';

export const Signup = () => {
    type JsonTypeSignup = {
        token: string;
        error: {
            name: {
                msg: string;
            },
            email: {
                msg: string;
            },
            state: {
                msg: string;
            },
            password: {
                msg: string;
            }
        }               
    }

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [stateList, setStateList] = useState<StatesType[]>([]);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');    
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const getStates = async () => {
            const states = await useAPI.getStates();            
            setStateList(states.states);            
        }
        getStates();
    }, []);

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }  
    const handleState = (e: ChangeEvent<HTMLSelectElement>) => {
        setState(e.target.value);
    }  
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }

    const handleErrorExit = () => {
        setError('');
    }

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {                
        e.preventDefault();
        setError('');
        if(!name || !email || !state || !password || !confirmPassword) {
            setError('Preencha todos os campos!');
        } else {
            if(password === confirmPassword) {            
                setDisabled(true);
                
                const json: JsonTypeSignup = await useAPI.createUser(name, email, state, password);

                if(json.error) {
                    setError(json.error.toString());
                    setDisabled(false);
                    if(json.error.name) {
                        setError(json.error.name.msg);                                
                    }
                    if(json.error.email) {
                        setError(json.error.email.msg);                                
                    }
                    if(json.error.state) {
                        setError(json.error.state.msg);                                
                    }
                    if(json.error.password) {
                        setError(json.error.password.msg);                        
                    }                
                } else {
                    doLogin(json.token);
                    window.location.href = "/"
                }
            } else {
                setError('As senhas precisam ser iguais!');
            }
        }        
    }

    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            {error !== '' &&
                <Error error={error} onClick={handleErrorExit} />
            }
            <C.PageArea>
                <form onSubmit={handleSubmit}>
                <div className="input--container">
                        <div className="name--input">Nome</div>
                        <div className="area--input">
                            <input type="text" value={name} onChange={handleName} disabled={disabled} />
                        </div>                        
                    </div>
                    <div className="input--container">
                        <div className="name--input">E-mail</div>
                        <div className="area--input">
                            <input type="email" value={email} onChange={handleEmail} disabled={disabled} />
                        </div>                        
                    </div>
                    <div className="input--container">
                        <div className="name--input">Estado</div>
                        <div className="area--input">
                            <select value={state} onChange={handleState} disabled={disabled}>
                                <option></option>
                                {stateList.map((item, index)=>(
                                    <option key={index} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </div>                        
                    </div>
                    <div className="input--container">
                        <div className="name--input">Senha</div>
                        <div className="area--input">
                            <input type="password" value={password} onChange={handlePassword} disabled={disabled} />
                        </div>                        
                    </div>
                    <div className="input--container">
                        <div className="name--input">Confirmar senha</div>
                        <div className="area--input">
                            <input type="password" value={confirmPassword} onChange={handleConfirmPassword} disabled={disabled} />
                        </div>                        
                    </div>                    
                    <div className="input--container">
                        <div className="name--input"></div>
                        <div className="area--input">
                            <input type="submit" value="Criar conta" disabled={disabled} />
                        </div>                        
                    </div>
                </form>
            </C.PageArea>
        </PageContainer>
    );
}