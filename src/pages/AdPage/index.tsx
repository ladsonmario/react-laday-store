import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageContainer, PageTitle } from '../../components/MainComponents';
import { AdType } from '../../types/types';
import { useAPI } from '../../helpers/api';
import { formatDate, convertRealFormat } from '../../helpers/assistant';
import { AdItem } from '../../components/partials/AdItem';
import * as C from './styles';

export const AdPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id as string;

    const [ad, setAd] = useState<AdType>();    
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {        
        const getAd = async (id: string) => {
            window.scroll({ top: 0, behavior: 'smooth' });
            
            setAd(undefined);                        
            setLoading(true);            
            
            const ad: AdType = await useAPI.getAd(id);              
            setAd(ad);            
            
            if(ad.error) {
                navigate("*");
            } 

            setLoading(false);
        }
        getAd(id);
    }, [id, navigate]);

    let price: string = '';
    if(ad?.priceNegotiable) {
        price = 'Preço negociável!';
    } else {    
        if(ad?.price !== 0) {
            price = convertRealFormat(ad?.price as number);
        } else {
            price = 'R$ 0';
        }        
    }
    
    return (
        <PageContainer>
            <C.BreadCrumb>             
                {ad?.category && ad.state &&
                    <>
                        Você está aqui:
                        <Link to="/">Home</Link>
                        /
                        <Link to={`/ads?state=${ad.state.name}`}>{ad.state.name}</Link>
                        /
                        <Link to={`/ads?cat=${ad.category.slug}`}>{ad.category.name}</Link>
                        /
                        <span>{ad.title}</span>
                    </>
                }       
            </C.BreadCrumb>                          
            <C.PageArea>                
                <div className="left--side">
                    <div className="box"> 
                        {loading &&
                            <C.PageFake height={40} />
                        }
                        <div className="ad--name--date">                            
                            <div className="name--data">
                                <h2>{ad?.title}</h2>
                                {ad?.dateCreated &&
                                    <small>{formatDate(ad?.dateCreated)}</small>
                                }
                            </div>
                            <div className="ad--views">
                                {(ad?.views || ad?.views === 0) &&
                                    <>
                                        <span className="title--info">Visualizações</span>
                                        <div>{ad.views}</div>
                                    </>
                                }
                            </div>
                        </div> 
                        <div className="img--container">
                            <div className="ad--img">
                                {loading &&
                                    <C.PageFake height={350} />
                                }
                                {ad?.images.length as number > 0 &&
                                    <Slide>
                                        {ad?.images.map((img, index) => (                                    
                                            <div className="each--slide" key={index}>
                                                <img src={img.toString()} alt="" />
                                            </div>
                                        ))} 
                                    </Slide>
                                }
                                                           
                            </div>
                        </div>                        
                        <div className="ad--info">
                            {loading &&
                                <C.PageFake height={200} />                                
                            }
                            {ad?.description &&
                                <>
                                    <span className="title--info">Descrição</span>
                                    <pre>{ad.description}</pre>
                                </>                                
                            }
                            <div className="ad--state--cat">
                                {ad?.category &&
                                    <div className="state--cat">
                                        <span className="title--info">Categoria</span>
                                        <Link to={`/ads?cat=${ad.category.slug}`}>{ad.category.name}</Link>
                                    </div>
                                }
                                {ad?.state &&
                                    <div className="state--cat">
                                        <span className="title--info">Localização</span>
                                        <Link to={`/ads?state=${ad.state.name}`}>{ad.state.name}</Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>                    
                </div>
                <div className="right--side">
                    <div className="box">                        
                        {loading &&
                            <C.PageFake height={40} />
                        }
                        {(ad?.price || ad?.priceNegotiable || ad?.price === 0) &&
                            <div className="ad--price">
                                <span className="title--info">Preço</span>   
                                {price === 'Preço negociável!' &&
                                    <div className="priceneg">{price}</div>
                                }  
                                {price !== 'Preço negociável!' &&
                                    <div className="price">{price}</div>
                                }                               
                            </div>
                        }
                    </div>
                    <div className="box">
                        {loading &&
                            <C.PageFake height={40} />
                        }
                        {ad?.userInfo &&
                            <div className="ad--contact">
                                <span className="title--info">Contatos</span>   
                                <div className="">{ad.userInfo.name}</div>
                                <a href={`malito:${ad.userInfo.email}`}>{ad.userInfo.email}</a>
                            </div>
                        }
                    </div>
                </div>
            </C.PageArea>
            <C.OthersAds>
                    {ad?.others && ad.others.length > 0 &&
                        <PageTitle>Outros Anúncios</PageTitle>
                    }
                    <div className="others--ads--item">                    
                        {ad?.others && ad.others.length > 0 && ad.others.map((item, index) => (                                                    
                            <AdItem data={item} key={index} />                                                                            
                        ))}
                    </div>              
            </C.OthersAds>
        </PageContainer>
    );
}