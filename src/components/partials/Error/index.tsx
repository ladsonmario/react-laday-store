import * as C from './styles';

type Props = {
    error: string;
    onClick: () => void;
}
export const Error = ({ error, onClick }: Props) => {    
    return (
        <C.ErrorContainer>
            <div>{error}</div>
            <div onClick={onClick}>✖</div>
        </C.ErrorContainer>
    );
}