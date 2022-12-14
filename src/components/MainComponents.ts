import styled from 'styled-components';

export const Template = styled.div``;

export const PageContainer = styled.div`
    max-width: 1280px;
    margin: auto;
    
    @media(max-width: 600px) {
        padding: 0 10px;
    }
`;

export const PageTitle = styled.h2`
    margin: 13px 0;
    font-size: 22px;
`;