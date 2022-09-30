import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer, PageTitle } from '../../components/MainComponents';
import { AdType } from '../../types/types';
import { useAPI } from '../../helpers/api';
import { formatDate } from '../../helpers/assistant';
import * as C from './styles';

export const AdPage = () => {
    const params = useParams();   

    const [ad, setAd] = useState<AdType>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getAd = async (id: string) => {
            const ad: AdType = await useAPI.getAd(id);  
            console.log(ad);
            setAd(ad);
            setLoading(false);
        }
        getAd(params.id as string);
    }, []);
    
    return (
        <PageContainer>                       
            <C.PageArea>                
                <div className="left--side">
                    <div className="box"> 
                        <div className="ad--name--date">
                            {loading &&
                                <C.PageFake height={40} />
                            }
                            <PageTitle>{ad?.title}</PageTitle>
                            {ad?.dateCreated &&
                                <small>{formatDate(ad?.dateCreated)}</small>
                            }                        
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
                                                <img src={img} alt="" />
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
                                <p>{ad.description}</p>                                
                            </>                                
                            }
                            <div className="ad--details">
                                {ad?.category &&
                                    <div></div>
                                }
                            </div>
                        </div>
                    </div>                    
                </div>
                <div className="right--side">
                    ...
                </div>
            </C.PageArea>
        </PageContainer>
    );
}