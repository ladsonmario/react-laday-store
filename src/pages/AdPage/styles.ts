import styled from 'styled-components';

export const PageArea = styled.div`    
    display: flex;
    gap: 20px;       

    .box {
        background-color: #fff;        
        box-shadow: 0 0 5px #999;
        width: 100%;                
    }

    .title--info {
        display: block;
        font-size: 18px;        
        margin-bottom: 5px;
        font-weight: bold;
        color: #555;
    }


    .left--side {
        display: flex;        
        flex: 1;

        .box {
            display: flex;
            flex-direction: column;
            padding: 30px;
        }

        .ad--name--date {
            display: flex;
            justify-content: space-between;

            small {
                color: #777;
            }
        }

        .img--container {
            display: flex;
            justify-content: center;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            padding: 20px 0;
            margin: 20px 0;
        }

        .ad--img {
            max-width: 400px;
            width: 100%;
            max-height: 400px;           
            height: 100%;

            .each--slide {
                display: flex;

                img {
                    max-width: 400px;
                    width: 100%;
                    max-height: 400px;           
                    height: 100%;
                    object-fit: cover;
                }
            }
        }

        .ad--info {
            padding: 20px; 
            
            pre {
                white-space: pre-wrap;
            }
            
            .ad--state--cat {
                display: flex;
                gap: 40px;
                margin-top: 40px;

                a {
                    color: #777;

                    &:hover {
                        color: #999;
                    }

                    &:nth-child(2) {
                        text-transform: capitalize;
                    }
                }
            }
        }
    }

    .right--side {
        display: flex;
        flex-direction: column;
        gap: 30px;
        width: 250px;
        
        .box {
            padding: 30px;
        }

        .button-speak {
            color: #fff;
            background-color: #f28000;
            font-weight: bold;
            padding: 15px;                    
            border-radius: 5px;
            font-size: 18px;
            text-align: center;

            &:hover {
                background-color: #d97200;
            }
        }

        .ad--price {

            .priceneg {
                font-weight: bold;
            }
            .price {
                display: inline-block;                
                font-size: 26px;
                font-style: italic;                
                background-color: #00f;
                color: #fff;
                padding: 5px 10px;
                border-radius: 5px;
            }
        }

        .ad--contact {            

            a {
                color: #777;                

                &:hover {
                    color: #999;
                }
            }
        }
    }

    @media(max-width: 600px) {
        flex-direction: column;
        padding: 0 10px;

        .left--side {

            .ad--name--date {
                flex-direction: column;

                .ad--views {
                    margin-top: 10px;                    
                }
            }
        }

        .right--side {
            width: auto;
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
    background: linear-gradient(45deg, #ccc, #fff, #ddd, #fff);
    background-size: 200% 200%;
    animation: colors .9s ease infinite;
`;

export const BreadCrumb = styled.div`
    display: flex;
    margin: 20px 0;

    a {
        margin: 0 5px;
        color: #555;
        
        &:nth-child(3) {
            text-transform: capitalize;
        }

        &:hover {
            color: #888;
        }
    }
    
    span {
        margin: 0 5px;
        font-weight: bold; 
    }

    @media(max-width: 600px) {
        padding: 0 10px;
        font-size: 14px;
        align-items: center;
    }
`;

export const OthersAds = styled.div`
    .others--ads--item {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;                
    }

    @media(max-width: 900px) {
        .others--ads--item {
            grid-template-columns: repeat(3, 1fr);
        }        
    }

    @media(max-width: 600px) {
        padding: 0 10px;
        .others--ads--item {
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;