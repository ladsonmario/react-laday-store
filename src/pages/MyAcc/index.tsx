import { ChangeEvent, SyntheticEvent, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer, PageTitle } from '../../components/MainComponents';
import { Error } from '../../components/partials/Error';
import { formatDate, convertRealFormat } from '../../helpers/assistant';
import { CategoryType, AdType, StatesType } from '../../types/types';
import { NumericFormat } from 'react-number-format';
import editSvg from './images/edit.svg';
import trashSvg from './images/trash.svg';
import fileSvg from './images/file.svg';
import * as C from './styles';
import { useAPI } from '../../helpers/api';

export const MyAcc = () => {
    type UserInfoType = {
        _id: string;
        name: string;
        email: string;
        state: {
            _id: string;
            name: string;
        }
        ads: AdType[]
    }

    type AdUpdateJson = {
        atualização?: boolean;
        error?: string;
    }

    type UserUpdateJson = {
        atualização?: boolean;
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

    type UpdateUserType = {
        name?: string;
        state?: string;
        email?: string;
        password?: string;
    }

    const fileFiled = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [stateLoc, setStateLoc] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [catList, setCatList] = useState<CategoryType[]>([]);
    const [stateList, setStateList] = useState<StatesType[]>([]);
    const [cat, setCat] = useState<string>('');    
    const [price, setPrice] = useState<any>('');
    const [priceNeg, setPriceNeg] = useState<boolean>(false);
    const [desc, setDesc] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingInfo, setLoadingInfo] = useState<boolean>(false);
    const [modalAd, setModalAd] = useState<boolean>(false);
    const [modalUser, setModalUser] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfoType>();
    const [adInfo, setAdInfo] = useState<AdType>();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {        
        getInfoUser();
    }, []);

    useEffect(() => {
        const getCategory = async () => {
            const cat: CategoryType[] = await useAPI.getCategory();            
            setCatList(cat);            
        }
        getCategory();
    }, []);

    useEffect(() => {
        const getStates = async () => {
            const states: StatesType[] = await useAPI.getStates();             
            setStateList(states);            
        }
        getStates();
    }, []);

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setName( e.target.value );
    }
    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail( e.target.value );
    }
    const handleState = (e: ChangeEvent<HTMLSelectElement>) => {
        setStateLoc( e.target.value );
    }
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword( e.target.value );
    }
    const handlePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm( e.target.value );
    }
    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle( e.target.value );
    }
    const handleCat = (e: ChangeEvent<HTMLSelectElement>) => {
        setCat( e.target.value );
    }
    const handlePrice = (values: any) => {          
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
    const reset = () => {
        setAdInfo(undefined);
        setTitle('');
        setCat(''); 
        setPrice({ formattedValue: `R$ `, value: `${0}`, floatValue: 0 });
        setPriceNeg(false);
        setDesc('');
        setPassword('');
        setPasswordConfirm('');
    }
    const handleExitModal = () => {
        setModalAd(false);
        setModalUser(false);
    }

    const handleTrueField = () => {
        setDisabled(!disabled);
    }

    const getInfoUser = async () => {
        setUserInfo(undefined);
        setLoading(true);        
        
        const infoUser = await useAPI.getUser() as UserInfoType;                    
        
        setUserInfo(infoUser);
        setName(infoUser.name);
        setEmail(infoUser.email); 
        setStateLoc(infoUser.state._id);
        setLoading(false);
    }

    const loadingInfoAd = async (id: string) => {    
        setLoadingInfo(true);
        reset();
        setAdInfo(undefined);
        setModalAd(true);
        
        const loadingAd: AdType = await useAPI.getAd(id);
        
        setAdInfo(loadingAd);
        setTitle(loadingAd.title);
        setCat(loadingAd.category.slug);
        setPriceNeg(loadingAd.priceNegotiable);
        setPrice({ formattedValue: `R$ ${loadingAd.price}`, value: `${loadingAd.price}`, floatValue: loadingAd.price });
        setDesc(loadingAd.description); 

        setLoadingInfo(false);
    }

    const handleSubmitUpdateAd = async (e: SyntheticEvent<HTMLFormElement>) => {        
        e.preventDefault();
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

        const json: AdUpdateJson = await useAPI.adUpdate(adInfo?._id as string, data);             

        if(json.error) {            
            setError(json.error);            
        } 
        if(json.atualização) {
            setModalAd(false);
            alert(`Anúncio ${title} atualizado com sucesso!`);
            getInfoUser();
        }        
    }  

    const handleEditUser = () => {
        reset();
        setDisabled(true);
        setModalUser(true);
    }
    
    const handleSubmitUserEdit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setDisabled(true);
        
        let updateUser = {} as UpdateUserType;       

        if(name !== userInfo?.name) {
            updateUser.name = name;
        }
        if(email !== userInfo?.email) {
            updateUser.email = email;
        }
        if(stateLoc !== userInfo?.state._id) {
            updateUser.state = stateLoc;
        }
        if(password !== '' || passwordConfirm !== '') {
            if(password === passwordConfirm) {
                updateUser.password = password;
            } else {
                setError('As senhas precisam ser iguais!');
                setDisabled(false);
                return;
            }
        }

        const json: UserUpdateJson = await useAPI.userUpdate(updateUser);

        if(json.atualização) {
            setModalUser(false);
            alert('Dados atualizados!');
            getInfoUser();
        }

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
        }
    }

    const handleDelUser = (id: string) => {

    }

    const handleDelAd = async (id: string, title: string) => {
        if(window.confirm(`Você tem certeza que deseja excluir o anúncio ${title}?`)) {
            const json = await useAPI.delAd(id);

            if(json.error) {
                alert(json.error);
            } else {
                alert('Anúncio foi excluido com sucesso!');
                getInfoUser();
            }
        }
    }

    return (
        <PageContainer>
            <PageTitle>Minha Conta</PageTitle>
            {error !== '' &&
                <Error error={error} onClick={handleErrorExit} />
            }
            <C.PageArea>
                <h3>Configurações gerais do perfil</h3>
                <div className="user--info">
                    <div className="user--info--data">
                        <div className="info--container">
                            <div className="info--key">Nome</div>
                            <div className="info--value">
                                {loading &&
                                    <C.PageFake height={30} />
                                }
                                {userInfo?.name}
                            </div>
                        </div>                    
                        <div className="info--container">
                            <div className="info--key">E-mail</div>
                            <div className="info--value">
                                {loading &&
                                    <C.PageFake height={30} />
                                }
                                {userInfo?.email}
                            </div>
                        </div>
                        <div className="info--container">
                            <div className="info--key">Estado</div>
                            <div className="info--value">
                                {loading &&
                                    <C.PageFake height={30} />
                                }
                                {userInfo?.state.name}
                            </div>
                        </div> 
                    </div>                     
                    <div className="user--tools">
                        <button className="edit--button--user" onClick={handleEditUser}>Editar dados</button>
                        <button className="del--buton--user" onClick={() => handleDelUser(userInfo?._id as string)}>Excluir conta</button>
                    </div>                  
                </div>  
                {modalUser &&
                    <C.Modal>
                        <form onSubmit={handleSubmitUserEdit}>
                            {error !== '' &&
                                <Error error={error} onClick={handleErrorExit} />
                            }
                            <div className="exit" onClick={handleExitModal}>❌</div>
                            <PageTitle>Editar Dados</PageTitle>
                            <div className="input--container">
                                <div className="name--input"></div>
                                <div className="area--input">
                                    <button type="button" className="button--true--field" onClick={handleTrueField}>{disabled ? 'Liberar Campos' : 'Bloquear Campos'}</button>                                            
                                </div>                        
                            </div>
                            <div className="input--container">
                                <div className="name--input">Nome</div>
                                <div className="area--input">
                                    {loadingInfo &&
                                        <C.PageFake height={30} />
                                    }
                                    {!loadingInfo &&
                                        <input type="text" onChange={handleName} value={name} disabled={disabled} />
                                    }                                            
                                </div>                        
                            </div>
                            <div className="input--container">
                                <div className="name--input">E-mail</div>
                                <div className="area--input">
                                    {loadingInfo &&
                                        <C.PageFake height={30} />
                                    }
                                    {!loadingInfo &&
                                        <input type="text" onChange={handleEmail} value={email} disabled={disabled} />
                                    }                                            
                                </div>                        
                            </div>
                            <div className="input--container">
                                <div className="name--input">Estado</div>
                                <div className="area--input">
                                    {loadingInfo &&
                                        <C.PageFake height={30} />
                                    }
                                    {!loadingInfo &&                                                    
                                    <select onChange={handleState} disabled={disabled}>
                                        {stateList.map((item, index)=>(
                                            <option key={index} value={item._id}>{item.name}</option>
                                        ))}
                                    </select>
                                    }                                                
                                </div>                        
                            </div>
                            <div className="input--container">
                                <div className="name--input"></div>
                                <div className="area--input">
                                <small>Caso queirar atualizar sua senha digite a nova e repita, caso contrario deixe o campo em branco.</small>                                             
                                </div>                        
                            </div>                            
                            <div className="input--container">
                                <div className="name--input">Nova Senha</div>
                                <div className="area--input">
                                    {loadingInfo &&
                                        <C.PageFake height={30} />
                                    }
                                    {!loadingInfo &&
                                        <input type="password" onChange={handlePassword} value={password} disabled={disabled} />
                                    }                                            
                                </div>                        
                            </div>
                            <div className="input--container">
                                <div className="name--input">Repetir Senha</div>
                                <div className="area--input">
                                    {loadingInfo &&
                                        <C.PageFake height={30} />
                                    }
                                    {!loadingInfo &&
                                        <input type="password" onChange={handlePasswordConfirm} value={passwordConfirm} disabled={disabled} />
                                    }                                            
                                </div>                        
                            </div>                                                              
                            <div className="input--container">
                                <div className="name--input"></div>
                                <div className="area--input">
                                    <input type="submit" value="Atualizar dados" disabled={disabled} />
                                </div>                        
                            </div>
                        </form>
                    </C.Modal>
                }              
            </C.PageArea>
            {userInfo?.ads && userInfo?.ads.length > 0 &&
                <>
                    <PageTitle>Meus Anúncios</PageTitle>            
                    <C.PageArea>
                        <div className="ads--list">
                            <ul className="list">
                                {loading &&
                                    <C.PageFake height={400} />
                                }
                                {userInfo?.ads.map((item, index) => (                            
                                    <li key={index}>                                
                                        <img src={item.images[0].url} alt="" />
                                        <div className="ad--info">                                    
                                            <div className="ad--title">{item.title}</div>
                                            <small>{formatDate(item.dateCreated)}</small>
                                            <div className="ad--price">{item.priceNegotiable === true ? 'Preço Negociavel' : convertRealFormat(item.price)}</div>                                                                                                         
                                        </div>                                
                                        <div className="ad--tools">
                                            <button className="ad--img--tools" title="Visualizar Anúncio">
                                                <Link  to={`/ad/${item._id}`} target="_blank">
                                                    <img src={fileSvg} alt="" />
                                                </Link>
                                            </button>                                    
                                            <button className="ad--img--tools" title="Editar Anúncio" onClick={() => loadingInfoAd(item._id)}>
                                                <img src={editSvg} alt="" />
                                            </button>
                                            <button className="ad--img--tools" title="Deletar Anúncio" onClick={() => handleDelAd(item._id, item.title)}>
                                                <img src={trashSvg} alt="" />
                                            </button>                                    
                                        </div>
                                    </li>
                                ))}
                                {modalAd &&
                                    <C.Modal>                                
                                        <form onSubmit={handleSubmitUpdateAd}>
                                            {error !== '' &&
                                                <Error error={error} onClick={handleErrorExit} />
                                            }
                                            <div className="exit" onClick={handleExitModal}>❌</div>
                                            <PageTitle>Editar Anúncio</PageTitle>
                                            <div className="input--container">
                                                <div className="name--input"></div>
                                                <div className="area--input">
                                                    <button type="button" className="button--true--field" onClick={handleTrueField}>{disabled ? 'Liberar Campos' : 'Bloquear Campos'}</button>                                            
                                                </div>                        
                                            </div>
                                            <div className="input--container">
                                                <div className="name--input">Title</div>
                                                <div className="area--input">
                                                    {loadingInfo &&
                                                        <C.PageFake height={30} />
                                                    }
                                                    {!loadingInfo &&
                                                        <input type="text" onChange={handleTitle} value={title} disabled={disabled} />
                                                    }                                            
                                                </div>                        
                                            </div>
                                            <div className="input--container">
                                                <div className="name--input">Categoria</div>
                                                <div className="area--input">
                                                    {loadingInfo &&
                                                        <C.PageFake height={30} />
                                                    }
                                                    {!loadingInfo &&                                                    
                                                    <select onChange={handleCat} value={cat} disabled={disabled}>
                                                        {catList.map((item, index)=>(
                                                            <option key={index} value={item.slug}>{item.name}</option>
                                                        ))}
                                                    </select>
                                                    }                                                
                                                </div>                        
                                            </div>
                                            <div className="input--container">
                                                <div className="name--input">Preço Negociável?</div>
                                                <div className="area--input">
                                                    {loadingInfo &&
                                                        <C.PageFake height={30} />
                                                    }
                                                    {!loadingInfo &&
                                                        <input type="checkbox" checked={priceNeg} onChange={handlePriceNeg} disabled={disabled} />
                                                    }                                            
                                                </div>                        
                                            </div> 
                                            <div className="input--container">
                                                <div className="name--input">Preço</div>
                                                <div className="area--input">
                                                    {loadingInfo &&
                                                        <C.PageFake height={30} />
                                                    }
                                                    {!loadingInfo &&
                                                        <NumericFormat 
                                                            type="text"
                                                            prefix="R$ "
                                                            decimalSeparator=","
                                                            thousandSeparator="."
                                                            disabled={disabled || priceNeg}
                                                            value={price.value}
                                                            onValueChange={handlePrice}
                                                            placeholder="R$ "
                                                        />
                                                    }                                            
                                                </div>                        
                                            </div>
                                            <div className="input--container">
                                                <div className="name--input">Descrição</div>
                                                <div className="area--input">
                                                    {loadingInfo &&
                                                        <C.PageFake height={30} />
                                                    }
                                                    {!loadingInfo &&
                                                        <textarea value={desc} onChange={handleDesc} disabled={disabled}></textarea>
                                                    }                                            
                                                </div>                        
                                            </div>
                                            <div className="input--container">
                                                <div className="name--input">Imagens</div>
                                                <div className="area--input">
                                                    {loadingInfo &&
                                                        <C.PageFake height={30} />
                                                    }
                                                    {!loadingInfo &&
                                                        <input type="file" accept="image/png, image/jpeg, image/jpg" multiple ref={fileFiled} disabled={disabled} />                                                
                                                    }                                            
                                                </div>                        
                                            </div>                                   
                                            <div className="input--container">
                                                <div className="name--input"></div>
                                                <div className="area--input">
                                                    <input type="submit" value="Atualizar anúncio" disabled={disabled} />
                                                </div>                        
                                            </div>
                                        </form>
                                    </C.Modal>
                                }
                            </ul>
                        </div>  
                    </C.PageArea>
                </>                
            }           
            
        </PageContainer>
    );
}