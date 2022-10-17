import * as C from './styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuMobile from './menu-button.png';
import { isLogged, doLogoff } from '../../../helpers/AuthHandler';

export const Header = () => {
    const logged = isLogged();

    const [display, setDisplay] = useState<boolean>(false);

    const handleLogoff = () => {
        doLogoff();
        window.location.href = "/";
    }

    const handleMenuMobile = () => {
        setDisplay(!display);
    }
    const closeMenuMobile = () => {
        if(display) {
            setDisplay(!display);
        }        
    }

    return (
        <C.HeaderArea displayMenu={display}>
            <div className="menu--area">
                <div className="logo--area">
                    <Link to="/" onClick={closeMenuMobile}>
                        <h1>
                            <span>Laday</span>
                            <span>A</span>
                            <span>d</span>
                            <span>s</span>
                        </h1>                        
                    </Link>
                    <button className="menu--mobile" onClick={handleMenuMobile}>
                        <img src={MenuMobile} alt="" />
                    </button>                    
                </div>
                <nav>
                    <ul>
                        {!logged &&
                        <>
                            <li onClick={closeMenuMobile}>
                                <Link to="/signin">Login</Link>
                            </li>
                            <li onClick={closeMenuMobile}>
                                <Link to="/signup">Cadastro</Link>
                            </li>
                            <li onClick={closeMenuMobile} className="add--ad">
                                <Link to="/signin">Postar um anúncio</Link>
                            </li>
                        </>                            
                        }   
                        {logged &&
                        <>
                            <li onClick={closeMenuMobile}>
                                <Link to="/my-acc">Minha Conta</Link>
                            </li>
                            <li onClick={closeMenuMobile}>
                                <button onClick={handleLogoff}>Sair</button>
                            </li>
                            <li onClick={closeMenuMobile} className="add--ad">
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