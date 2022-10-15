import styled from 'styled-components';

export const PageArea = styled.div`    
    background-color: #ddd;
    padding: 20px 0;
    border-bottom: 1px solid #bbb;      

    .search--area {        
        background-color: #9bb83c;
        padding: 20px 15px;
        border-radius: 5px;
        
        
        form {
            display: flex;
            gap: 25px;
            height: 45px;            

            input[type="text"] {
                flex: 1;
                height: inherit;
                border-radius: 5px;
                border: 0;
                padding: 0 10px;
                outline: 0;
                font-size: 18px;
            }
            select {
                height: inherit;
                font-size: 18px;
                padding: 5px 15px;
                border-radius: 5px;
                border: 0;
            }
            input[type="submit"] {
                height: inherit;
                padding: 5px 15px;
                font-size: 16px;
                border: 0;
                border-radius: 5px;
                background-color: #49aeef;
                color: #fff;
                cursor: pointer;

                &:hover {
                    background-color: #309ce1;
                }
            }
        }
    }

    .category--area {
        margin-top: 30px;
        display: flex;
        flex-wrap: wrap;

        .category--item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 20%;
            margin: 10px 0;

            &:hover span {
                color: #888;
            }

            .img--category {
                width: 50px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #fff;
                border-radius: 50%;

                img {
                    width: 40px;
                    height: 40px;
                } 
            }

            span {
                text-transform: capitalize;
                font-size: 14px;
                color: #555;
                margin-top: 5px;
            }            
        }
    }

    @media(max-width: 900px) {
        .category--area {

            .category--item {
                width: 25%;
            }
        }
    }

    @media(max-width: 600px) {

        .search--area {
            
            form {
                flex-direction: column;
                height: auto;
                gap: 0;

                input[type="text"],
                select, 
                input[type="submit"] {
                    border-radius: 0;
                    height: 45px;
                    width: 100%;
                    flex: none;
                    border: 1px solid #999;
                }

                input[type="text"] {
                    border-radius: 7px 7px 0 0;
                }
                input[type="submit"] {
                    border-radius: 0 0 7px 7px;
                }

                select {
                    border-top: 0;
                    border-bottom: 0;
                }
            }
        }

        .category--area {

            .category--item {
                width: 33%;
            }
        }
    }
`;

export const AdsArea = styled.div` 
    .ads--area {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        padding: 10px;

        @media(max-width: 900px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media(max-width: 600px) {
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;