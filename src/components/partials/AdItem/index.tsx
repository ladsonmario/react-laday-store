import { Link } from 'react-router-dom';
import { AdsType } from '../../../types/types';
import { convertRealFormat } from '../../../helpers/assistant';
import * as C from './styles';

type Props = {
    data: AdsType;
}
export const AdItem = ({ data }: Props) => {  
    let price: string = '';
    if(data.priceNegotiable) {
        price = 'Preço negociável!';
    } else {
        price = convertRealFormat(data.price);
    }

    return (
        <C.Item className="ad--item">
            <Link to={`/ad/${data._id}`} className="item--container">
                <div className="item--img">
                    <img src={data.image} alt="" />
                </div>
                <div className="item--name">{data.title}</div>
                <div className="item--price">{price}</div>
            </Link>
        </C.Item>
    );
}