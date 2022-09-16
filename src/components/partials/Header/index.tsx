import * as C from './styles';
import { Link } from 'react-router-dom';
import { isLogged } from '../../../helpers/AuthHandler';

export const Header = () => {
    const logged = isLogged();
    return (
        <C.HeaderArea>
            <div className="menu--area">
                <div className="logo--area">
                    <Link to="/">
                        <h1>
                            <span>Lad</span>
                            <span>ay</span>
                            <span>Ads</span>
                        </h1>                        
                    </Link>                    
                </div>
                <nav>
                    <ul>
                        {!logged &&
                        <>
                            <li>
                                <Link to="/signin">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Cadastro</Link>
                            </li>
                            <li className="add--ad">
                                <Link to="/signin">Postar um anúncio</Link>
                            </li>
                        </>                            
                        }   
                        {logged &&
                        <>
                            <li>
                                <Link to="">Minha Conta</Link>
                            </li>
                            <li>
                                <Link to="">Sair</Link>
                            </li>
                            <li className="add--ad">
                                <Link to="">Postar um anúncio</Link>
                            </li>
                        </>                            
                        }                     
                    </ul>
                </nav>
            </div>
        </C.HeaderArea>
    );
}