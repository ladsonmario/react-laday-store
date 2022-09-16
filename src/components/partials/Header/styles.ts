import styled from 'styled-components';

export const HeaderArea = styled.div`
    background-color: #fff;
    border-bottom: 1px solid #999;

    .menu--area {
        max-width: 1280px;
        display: flex;
        align-items: center;
        margin: auto;
        height: 50px;

        .logo--area {
            flex: 1;
            
            h1 {
                font-size: 26px;
            }

            span:nth-child(1) {
                color: #f00;
            }
            span:nth-child(2) {
                color: #47B564                
            }
            span:nth-child(3) {
                color: #00f;
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
            li {
                margin: 0 20px;
                font-size: 15px;
                
                a:hover {
                    color: #999;
                }
            }
            .add--ad {                
                border: 0;
                
                a {
                    color: #fff;
                    font-weight: bold;
                    background-color: #08D9D6;                
                    border-radius: 5px;
                    padding: 5px 10px;
                    font-size: 16px;

                    &:hover {
                        background-color: #5CB8E4;
                        color: #fff;
                    }
                }                
            }
        }
    }
`;