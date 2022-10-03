import * as C from './styles';
import { Link } from 'react-router-dom';
import { isLogged, doLogoff } from '../../../helpers/AuthHandler';

export const Header = () => {
    const logged = isLogged();

    const handleLogoff = () => {
        doLogoff();
        window.location.href = "/";
    }
    return (
        <C.HeaderArea>
            <div className="menu--area">
                <div className="logo--area">
                    <Link to="/">
                        <h1>
                            <span>Laday</span>
                            <span>A</span>
                            <span>d</span>
                            <span>s</span>
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
                                <button onClick={handleLogoff}>Sair</button>
                            </li>
                            <li className="add--ad">
                                <Link to="/add-ad">Postar um anúncio</Link>
                            </li>
                        </>                            
                        }                     
                    </ul>
                </nav>
            </div>
        </C.HeaderArea>
    );
}