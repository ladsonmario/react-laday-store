import styled from 'styled-components';

type HeaderAreaType = { 
    displayMenu: boolean; 
};

export const HeaderArea = styled.div<HeaderAreaType>`
    background-color: #fff;
    border-bottom: 1px solid #bbb;    

    .menu--area {
        max-width: 1280px;
        display: flex;
        align-items: center;
        margin: auto;
        height: 60px;

        .logo--area {
            flex: 1;
            width: 100%;
            position: relative;
            
            .menu--mobile {
                position: absolute;
                right: 20px;
                top: 2px;                
                display: none;
                border: 0;
                background: none;
                cursor: pointer;                

                img {
                    position: relative;
                    width: 30px;
                    height: 30px;
                }
            }
            
            h1 {
                font-size: 26px;
                margin: 0 10px;                
            }

            span:nth-child(1) {
                color: #87042E;
            }
            span:nth-child(2) {
                color: #6e0ad6                
            }
            span:nth-child(3) {
                color: #8ce563;
            }
            span:nth-child(4) {
                color: #f28000;
            }            
        }
        
        nav {           

            ul, li {
                list-style: none;
            }
            ul {
                display: flex;                
                align-items: center;
            }
            li, button {
                margin: 0 20px;
                font-size: 15px; 
                background: none;
                border: 0;
                cursor: pointer;               
                
                a:hover,
                button:hover {
                    color: #999;
                }
            }
            .add--ad {                
                border: 0;
                
                a {
                    color: #fff;
                    font-weight: bold;
                    background-color: #f28000;                
                    border-radius: 5px;
                    padding: 5px 10px;
                    font-size: 16px;
                    transition: all ease .2s;

                    &:hover {                        
                        color: #fff;
                        background-color: #d97200;
                    }
                }                
            }
        }
    }

    @media(max-width: 600px) { 
        padding: 5px 0;       
        
        .menu--area {
            height: auto;
            flex-direction: column;

            .logo--area {
                margin: 10px 0;

                .menu--mobile {
                    display: block;
                }

                h1 {
                    text-align: center;
                }
            }

            nav {

                ul { 
                    height: ${props => props.displayMenu ? '107px' : '0'};                    
                    flex-direction: column;
                    transition: all ease .5s;                    
                } 
                
                li {
                    margin-bottom: 15px;
                }
            }
        }
    }
`;