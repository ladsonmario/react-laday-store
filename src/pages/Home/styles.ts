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
            }
        }
    }
`;