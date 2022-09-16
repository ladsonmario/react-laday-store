import { ChangeEvent, SyntheticEvent, useState, useEffect } from 'react';
import { PageContainer, PageTitle, Error } from '../../components/MainComponents';
import * as C from './styles';
import { useAPI } from '../../helpers/api';
import { StatesType } from '../../types/types';

export const Signup = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [state, setState] = useState<StatesType[]>([]);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');    
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const getStates = async () => {

        }
        getStates();
    }, []);

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }    
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {        
        e.preventDefault();
        if(password === confirmPassword) {            
            setDisabled(true);

        } else {
            // senhas não batem
        }
    }

    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            {error !== '' &&
                <Error>{error}</Error>
            }
            <C.PageArea>
                <form onSubmit={handleSubmit}>
                <div className="input--container">
                        <div className="name--input">Nome</div>
                        <div className="area--input">
                            <input type="email" value={name} onChange={handleName} disabled={disabled} />
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
                            <select>
                                <option></option>
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
                            <input type="submit" value="Fazer Login" disabled={disabled} />
                        </div>                        
                    </div>
                </form>
            </C.PageArea>
        </PageContainer>
    );
}