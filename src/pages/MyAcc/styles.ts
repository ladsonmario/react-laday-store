import styled from 'styled-components';

export const PageArea = styled.div`    
    padding: 30px;
    background-color: #fff;
    box-shadow: 0 0 5px #999;
    border-radius: 3px;    

    .user--info {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        margin: 15px 0;
        padding: 15px 0;
        display: flex;
        justify-content: space-between;

        .info--container {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;

            .info--key {
                width: 200px;
                text-align: end;
                font-weight: bold;
            }

            .info--value {
                width: 100%;
            }
        }     
        
        .user--tools {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-right: 30px;
            
            button {
                border: 0;
                outline: 0;
                background: none;
                color: #216fdb;
                font-size: 15px;
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }

            .del--buton--user:hover {
                color: #f00;                    
            }
        }
    }    

    .ads--list {

        .list {
            list-style: none;            

            li {
                background-color: #fff;
                list-style: none;
                display: flex;
                align-items: center;
                gap: 20px;
                border-top: 1px solid #ddd;
                border-bottom: 1px solid #ddd;                
                padding: 10px;                
                
                &:nth-child(even) {
                    background-color: #eee;
                    border-top: 1px solid #ccc;
                    border-bottom: 1px solid #ccc;
                }

                img {
                    width: 100px;
                    height: 100px;
                }

                .ad--info {
                    flex: 1;

                    .ad--title {
                        font-size: 16px;
                        font-weight: bold;
                    }

                    .ad--price {
                        margin-top: 15px;
                        font-weight: bold;
                    }
                }

                .ad--tools {
                    display: flex;

                    .ad--img--tools {
                        margin: 0 5px;
                        cursor: pointer;
                        border: 0;
                        padding: 5px;
                        border-radius: 5px;
                        transition: all ease .5s;
                        opacity: 0.8;                        

                        &:nth-child(1) {
                            background-color: #6B60E0;
                        }
                        &:nth-child(2) {
                            background-color: #E8C61D;
                        }
                        &:nth-child(3) {
                            background-color: #F43D40;
                        }

                        img{
                            width: 30px;
                            height: 30px;
                        }

                        &:hover {
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
`;

type PageFakeType = { height?: number; }
export const PageFake = styled.div<PageFakeType>`
    @keyframes colors {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    height: ${props => props.height || 20}px;
    width: inherit;        
    background: linear-gradient(45deg, #ccc, #fff, #ddd, #fff);
    background-size: 200% 200%;
    animation: colors .9s ease infinite;
`;

export const Modal = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    form {
        padding: 30px;
        background-color: #fff;
        max-width: 700px;
        width: 100%;
        position: relative;

        .exit {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 25px;
            cursor: pointer;
        }

        .button--true--field {
            border: 0;
            outline: 0;
            background: none;
            color: #216fdb;
            font-size: 15px;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }

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

                input, select, textarea {
                    width: 100%;                    
                    outline: 0;
                    padding: 5px;
                    font-size: 15px;   
                    resize: none;                 
                }
                textarea {
                    height: 100px;
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
                    transition: all ease .2s;

                    &:hover {
                        opacity: .9;
                        box-shadow: 0 0 5px #666;
                    }                    
                }
            }
    }
`;