import { useState, useEffect, ChangeEvent } from 'react';
import { StatesType } from '../../types/types';
import { PageContainer } from '../../components/MainComponents';
import * as C from './styles';
import { useAPI } from '../../helpers/api';

export const Home = () => {     
    const [stateList, setStateList] = useState<StatesType[]>([]);  

    useEffect(() => {
        const getStates = async () => {
            const states = await useAPI.getStates();            
            setStateList(states.states);            
        }
        getStates();
    }, []);
    
    return (
        <C.PageArea>
            <PageContainer>                            
                <div className="search--area">
                    <form method="GET" action="/ads">
                        <input type="text" name="q" placeholder="O que você procura?" />
                        <select name="state">
                            <option></option>
                            {stateList.map((item, index)=>(
                                <option key={index} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                        <input type="submit" value="Pesquisar" />
                    </form>
                </div>
            </PageContainer>
        </C.PageArea>        
    );
}