import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { PageContainer, PageTitle } from '../../components/MainComponents';
import { Error } from '../../components/partials/Error';
import * as C from './styles';
import { useAPI } from '../../helpers/api';
import { doLogin } from '../../helpers/AuthHandler';

export const Signin = () => {
    type JsonTypeSignin = {
        token: string;
        error: {
            email: {
                msg: string;
            },
            password: {
                msg: string;
            }
        }               
    }

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberPassword, setRememberPassword] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleChecked = () => {
        setRememberPassword(!rememberPassword);
    }

    const handleErrorExit = () => {
        setError('');
    }

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {                
        e.preventDefault();
        setError('');
        if(email && password) {                                    
            setDisabled(true);
            
            const json: JsonTypeSignin = await useAPI.login(email, password);   
                                         
            if(json.error) {
                setError(json.error.toString());
                setDisabled(false);
                if(json.error.email) {
                    setError(json.error.email.msg);                                
                }
                if(json.error.password) {
                    setError(json.error.password.msg);                        
                }                
            } else {
                doLogin(json.token, rememberPassword);
                window.location.href = "/"
            }                       
        } else {
            setError('Preencha e-mail e senha!');
        }
    }

    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
            {error !== '' &&
                <Error error={error} onClick={handleErrorExit} />
            }
            <C.PageArea>
                <form onSubmit={handleSubmit}>
                    <div className="input--container">
                        <div className="name--input">E-mail</div>
                        <div className="area--input">
                            <input type="email" value={email} onChange={handleEmail} disabled={disabled} />
                        </div>                        
                    </div>
                    <div className="input--container">
                        <div className="name--input">Senha</div>
                        <div className="area--input">
                            <input type="password" value={password} onChange={handlePassword} disabled={disabled} />
                        </div>                        
                    </div>
                    <label className="input--container">
                        <div className="name--input">Lembrar senha?</div>
                        <div className="area--input">
                            <input type="checkbox" checked={rememberPassword} onChange={handleChecked} disabled={disabled} />
                        </div>                        
                    </label>
                    <div className="input--container">
                        <div className="name--input"></div>
                        <div className="area--input">
                            <input type="submit" value="Fazer Login" disabled={disabled} />
                        </div>                        
                    </div>
                </form>
            </C.PageArea>
        </PageContainer>
    );
}