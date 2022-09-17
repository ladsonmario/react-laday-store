import styled from 'styled-components';

export const HeaderArea = styled.div`
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
            
            h1 {
                font-size: 26px;
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
                    background-color: #EA0909;                
                    border-radius: 5px;
                    padding: 5px 10px;
                    font-size: 16px;
                    transition: all ease .2s;

                    &:hover {
                        opacity: .9;
                        color: #fff;
                        box-shadow: 0 0 5px #666;
                    }
                }                
            }
        }
    }
`;