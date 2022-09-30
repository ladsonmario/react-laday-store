import styled from 'styled-components';

export const PageArea = styled.div`    
    display: flex;
    gap: 20px;

    .box {
        background-color: #fff;        
        box-shadow: 0 0 5px #999;
        width: 100%;
        height: 100%;
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

        }

        .img--container {
            display: flex;
            justify-content: center;
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
        }
    }

    .right--side {
        width: 250px;
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