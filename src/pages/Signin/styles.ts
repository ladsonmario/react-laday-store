import styled from 'styled-components';

export const PageArea = styled.div`    
    padding: 15px;
    background-color: #fff;
    box-shadow: 0 0 5px #999;
    border-radius: 3px;

    form {        
        margin: 15px 0;

        .input--container {
            display: flex;
            align-items:center;
            margin-bottom: 20px;

            .name--input {
                width: 200px;
                text-align: right;
                margin-right: 10px;
                font-size: 15px;
            }

            .area--input {
                width: 100%;
                max-width: 250px; 
                display: flex;                                          

                input {
                    width: 100%;                    
                    outline: 0;
                    padding: 5px;
                    font-size: 15px;
                }
                input[type="checkbox"] {
                    width: auto;                      
                }
                input[type="submit"] {
                    width: auto;
                    background-color: #2732FA;
                    color: #fff;
                    border: 0;
                    border-radius: 4px;
                    padding: 5px 10px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all ease .3s;

                    &:hover {
                        opacity: 0.9;
                        box-shadow: 0 0 5px #333;
                    }
                }
            }
        }
    }

    @media(max-width: 600px) {
        
        form {
            .input--container {
                flex-direction: column;

                .name--input {
                    width: 100%;
                    text-align: start;
                    margin: 0;
                }

                .area--input {
                    max-width: 100%;

                    input[type="submit"] {
                        width: 100%;
                        padding: 10px;
                    }
                }
            }
        }
    }
`;