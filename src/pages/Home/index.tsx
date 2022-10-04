import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StatesType, CategoryType, AdsType, JsonAds } from '../../types/types';
import { PageContainer, PageTitle } from '../../components/MainComponents';
import { AdItem } from '../../components/partials/AdItem';
import * as C from './styles';
import { useAPI } from '../../helpers/api';

export const Home = () => {     
    const [stateList, setStateList] = useState<StatesType[]>([]); 
    const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
    const [adList, setAdList] = useState<AdsType[]>([]);

    useEffect(() => {
        const getStates = async () => {
            const states: StatesType[] = await useAPI.getStates();             
            setStateList(states);            
        }
        getStates();
    }, []);

    useEffect(() => {
        const getCategory = async () => {
            const categories: CategoryType[] = await useAPI.getCategory();             
            setCategoryList(categories);
        }
        getCategory();
    }, []);

    useEffect(() => {
        const getAds = async () => {
            const json: JsonAds = await useAPI.getAds({ limit: 12, sort: 'DESC' });
            setAdList(json.ads as AdsType[]);
        }
        getAds();
    }, []);
    
    return (
        <>
            <C.PageArea>
                <PageContainer>                            
                    <div className="search--area">
                        <form method="GET" action="/ads">
                            <input type="text" name="q" placeholder="O que você procura?" />
                            <select name="state">                            
                                {stateList.map((item, index)=>(
                                    <option key={index} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                            <input type="submit" value="Pesquisar" />
                        </form>
                    </div>
                    <div className="category--area">
                        {categoryList.map((item, index) => (
                            <Link to={`/ads?cat=${item.slug}`} key={index} className="category--item">
                                <div className="img--category">
                                    <img src={item.img} alt="" />
                                </div>                            
                                <span className="name--category">{item.name}</span>
                            </Link>
                        ))}                    
                    </div>
                </PageContainer>            
            </C.PageArea> 
            <C.AdsArea>
                <PageContainer>
                    <PageTitle>Anúncios Recentes</PageTitle>
                    <div className="ads--area">
                        {adList.length > 0 && adList.map((item, index) => (
                            <AdItem key={index} data={item} />
                        ))}
                    </div>                
                </PageContainer>
            </C.AdsArea>            
        </>
               
    );
}