import { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StatesType, CategoryType, AdsType, JsonAds } from '../../types/types';
import { PageContainer, PageTitle } from '../../components/MainComponents';
import { AdItem } from '../../components/partials/AdItem';
import * as C from './styles';
import { useAPI } from '../../helpers/api';
import { Timeout } from 'react-number-format/types/types';

let timer: Timeout;

export const Ads = () => { 
    const navigate = useNavigate();

    const useQueryString = () => {
        return new URLSearchParams( useLocation().search );
    }
    const query = useQueryString();
    
    
    const [stateList, setStateList] = useState<StatesType[]>([]); 
    const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
    const [adList, setAdList] = useState<AdsType[]>([]); 
    const [opacity, setOpacity] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [adsTotal, setAdsTotal] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [q, setQ] = useState<string>(query.get('q') != null ? query.get('q') as string : '');
    const [cat, setCat] = useState<string>(query.get('cat') != null ? query.get('cat') as string : '');
    const [stateLoc, setStateLoc] = useState<string>(query.get('state') != null ? query.get('state') as string : '');

    const handleQ = (e: ChangeEvent<HTMLInputElement>) => {
        setQ( e.target.value );
    }
    const handleState = () => {
        setStateLoc(stateLoc);
    }
    const handleCat = (item: string) => {
        item === cat ? setCat('') : setCat(item);        
    }
    const formPreventDefaul = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    const handlePaginationItem = (page: number) => {
        setCurrentPage(page);
        console.log(page);
    }

    const getAdsList = async () => {    
        let offset: number = (currentPage - 1) * 9;
        
        const json: JsonAds = await useAPI.getAds({
            sort: 'DESC', limit: 9, q, cat, state: stateLoc, offset
        });

        setAdList(json.ads as AdsType[]);
        console.log(json.ads);
        console.log(json.total);
        console.log(q, cat, stateLoc, offset, currentPage);
        setAdsTotal(json.total as number);
        setOpacity(1);
        setLoading(false);
    }

    useEffect(() => {
        if(adList.length > 0) {
            setPageCount( Math.ceil( adsTotal / adList.length ) );
        } else {
            setPageCount(0);
        }
    }, [adsTotal]);

    useEffect(() => {
        setOpacity(0.3);
        getAdsList();
    }, [currentPage]);

    useEffect(() => {
        let newQuery: string[] = [];

        if(q) {
            newQuery.push(`q=${q}`);
        }
        if(cat) {
            newQuery.push(`cat=${cat}`);
        }
        if(stateLoc) {
            newQuery.push(`state=${stateLoc}`);
        }

        navigate(`/ads?${newQuery.join('&')}`, { replace: true });
        
        if(timer) {
            clearTimeout(timer);
        }
        
        timer = setTimeout(getAdsList, 2000);        
        setOpacity(0.3);
        setCurrentPage(1);
    }, [q, cat, stateLoc]);

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

    let pagination: number[] = [];
    for(let i = 1; i <= pageCount; i++) {
        pagination.push(i);
    }

    return (
        <PageContainer>
            <C.PageArea>
                <div className="left--side">
                    <form method="GET" onSubmit={formPreventDefaul}>
                        <input type="text" name="q" placeholder="O que você procura?" value={q} onChange={handleQ} />
                        <div className="state--cat">
                            <span className="title">Estado</span>
                            <select name="state" value={stateLoc} onChange={handleState}>
                                {stateList.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="state--cat">
                            <span className="title">Categorias</span>                            
                            {categoryList.map((item, index) => (
                                <div className={item.slug === cat ? 'category--item active' : 'category--item'} key={index} onClick={() => handleCat(item.slug)}>
                                    <img src={item.img} alt="" />
                                    <span>{item.name}</span>                                        
                                </div>
                            ))}                            
                        </div>
                    </form>
                </div>
                <div className="right--side">
                    <PageTitle>Resultados</PageTitle>
                    {loading &&
                        <div>Carregando...</div>
                    }
                    {!loading && adList.length === 0 &&
                        <div style={{ opacity }}>Não encontramos nenhum resultado pra sua pesquisa!</div>
                    }
                    <div className="ad--list" style={{ opacity }}>
                        {adList.map((item, index) => (
                            <AdItem data={item} key={index} />
                        ))}
                    </div>
                    <div className="pagination">
                        {pagination.map((item, index) => (
                            <div className={item === currentPage ? 'page--item active' : 'page--item'} key={index} onClick={() => handlePaginationItem(item)}>{item}</div>
                        ))}
                    </div>
                </div>
            </C.PageArea>
        </PageContainer>    
    );
}