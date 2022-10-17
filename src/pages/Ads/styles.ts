import styled from 'styled-components';

export const PageArea = styled.div`    
    display: flex;
    gap: 30px;
    margin-top: 30px;

    .left--side {
        width: 250px;

        form {
            
            input, select {
                width: 100%;
                padding: 5px;
                font-size: 15px;
                outline: 0;
                border: 2px solid #9bb83c;
                border-radius: 5px;
            }

            .state--cat {
                display: flex;
                flex-direction: column;
                margin-top: 20px;

                .title {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }

                .category--item {
                    display: flex;
                    align-items: center;
                    padding: 3px;
                    cursor: pointer;

                    img {
                        width: 40px;
                        height: 40px;
                        padding: 3px;
                        background-color: #fff;
                        border-radius: 50%;
                        margin-right: 10px;
                    }

                    span {                        
                        text-transform: capitalize;
                        font-size: 14px;
                    }

                    &.active,
                    &:hover {
                        background-color: #9bb83c;
                        border-radius: 5px;
                        
                        span {
                            color: #fff;
                        }
                    }
                }
            }
        }
    }

    .right--side {
        flex: 1;

        .ad--list {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;            
        }

        .pagination {
            display: flex;
            justify-content: center;
            margin-top: 30px;

            .page--item {
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #ddd;
                font-size: 14px;
                cursor: pointer; 
                background-color: #fff;  
                
                &.active,
                &:hover {
                    background-color: #eee;
                    border: 1px solid #ccc;
                }
            }
        }
    }

    @media(max-width: 600px) {
        flex-direction: column;
        padding: 0 10px;

        .left--side {
            width: auto;

            .state--cat .list {
                display: flex;
                flex-wrap: wrap;

                .category--item {
                    width: 33%;
                    flex-direction: column;

                    img {
                        margin: 0;
                    }
                    span {
                        font-size: 13px;
                    }
                }
            }
        }

        .right--side {
            .ad--list {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    }
`;