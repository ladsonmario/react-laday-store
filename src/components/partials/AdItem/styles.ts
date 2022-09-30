import styled from 'styled-components';

export const Item = styled.div`    
    padding: 10px;    
    border-radius: 5px;    
    background-color: #fff; 
    border: 1px solid #fff;
    transition: all ease .4s;   
    
    .item--container {        

        .item--img img {
            width: 100%;
        }
       
        .item--name {
            font-size: 20px;
            font-weight: bold;            
        }

        .item--price {
            font-size: 18px;
        }
    }
    
    &:hover {
        border: 1px solid #999;
        background-color: #efefef;
    }
`;