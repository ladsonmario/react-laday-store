import React, { ChangeEvent, SyntheticEvent, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageTitle } from '../../components/MainComponents';
import { Error } from '../../components/partials/Error';
import * as C from './styles';
import { useAPI } from '../../helpers/api';
import { CategoryType, PriceValuesType } from '../../types/types';
import { NumericFormat, OnValueChange } from 'react-number-format';

export const AddAd = () => { 
    type JsonAddAd = {
        error: string;
        id: string;
    }    
    
    const navigate = useNavigate();
    const fileFiled = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [title, setTitle] = useState<string>('');
    const [catList, setCatList] = useState<CategoryType[]>([]);
    const [cat, setCat] = useState<string>('');
    const [price, setPrice] = useState<any>('');
    const [priceNeg, setPriceNeg] = useState<boolean>(false);
    const [desc, setDesc] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const getCategory = async () => {
            const cat: CategoryType[] = await useAPI.getCategory();            
            setCatList(cat);            
        }
        getCategory();
    }, []);

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle( e.target.value );
    }
    const handleCat = (e: ChangeEvent<HTMLSelectElement>) => {
        setCat( e.target.value );
    }
    const handlePrice = (values: PriceValuesType) => {        
        const { value } = values;
        setPrice(value);
    }
    const handlePriceNeg = () => {
        setPriceNeg(!priceNeg);
    }
    const handleDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDesc( e.target.value );
    }

    const handleErrorExit = () => {
        setError('');
    }
    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {                
        e.preventDefault();
        setDisabled(true);
        setError('');
        
        const data = new FormData();
        data.append('title', title);
        data.append('cat', cat);
        data.append('price', price);
        data.append('priceneg', priceNeg ? 'true' : 'false');
        data.append('desc', desc);

        if(fileFiled.current.files) {
            for(let i = 0; i < fileFiled.current.files.length; i++) {
                data.append('img', fileFiled.current.files[i]);
            }
        }       

        const json: JsonAddAd = await useAPI.addAd(data);

        if(!json.error) {
            navigate(`/ad/${json.id}`);
        } else {
            setError(json.error);
        }

        setDisabled(false);
    }
    
    return (
        <PageContainer>
            <PageTitle>Adicionar anúncio</PageTitle>
            {error !== '' &&
                <Error error={error} onClick={handleErrorExit} />
            }
            <C.PageArea>
                <form onSubmit={handleSubmit}>
                <div className="input--container">
                        <div className="name--input">Título</div>
                        <div className="area--input">
                            <input type="text" value={title} onChange={handleTitle} disabled={disabled} />
                        </div>                        
                    </div>                    
                    <div className="input--container">
                        <div className="name--input">Categoria</div>
                        <div className="area--input">
                            <select onChange={handleCat} disabled={disabled}>
                                <option>Selecione uma categoria</option>
                                {catList.map((item, index)=>(
                                    <option key={index} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </div>                        
                    </div> 
                    <div className="input--container">
                        <div className="name--input">Preço</div>
                        <div className="area--input">
                            <NumericFormat 
                                type="text"
                                prefix="R$ "
                                decimalSeparator=","
                                thousandSeparator="."
                                disabled={disabled || priceNeg}
                                value={price.value}
                                onValueChange={handlePrice as OnValueChange}
                                placeholder="R$ "
                            />
                        </div>                        
                    </div> 
                    <div className="input--container">
                        <div className="name--input">Preço Negociável?</div>
                        <div className="area--input">
                            <input type="checkbox" checked={priceNeg} onChange={handlePriceNeg} disabled={disabled} />
                        </div>                        
                    </div> 
                    <div className="input--container">
                        <div className="name--input">Descrição</div>
                        <div className="area--input">
                            <textarea value={desc} onChange={handleDesc} disabled={disabled}></textarea>
                        </div>                        
                    </div> 
                    <div className="input--container">
                        <div className="name--input">Imagens</div>
                        <div className="area--input">
                            <input type="file" accept="image/png, image/jpeg, image/jpg" multiple ref={fileFiled} disabled={disabled} />
                        </div>                        
                    </div>                                   
                    <div className="input--container">
                        <div className="name--input"></div>
                        <div className="area--input">
                            <input type="submit" value="Postar anúncio" disabled={disabled} />
                        </div>                        
                    </div>
                </form>
            </C.PageArea>
        </PageContainer>
    );
}