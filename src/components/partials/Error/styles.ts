import styled from 'styled-components';

export const ErrorContainer = styled.div`
    background-color: #E20F12;
    color: #fff;
    border: 2px inset #f00;
    padding: 6px;
    margin-bottom: 5px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    
    div {
        color: #fff;
    }
    div:nth-child(2) {
        font-size: 20px;
        cursor: pointer;
    }
`;