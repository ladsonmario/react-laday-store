export type StatesType = {
    _id: string;
    name: string;
}

export type CategoryType = {
    _id: string;
    name: string;
    slug: string;
    img: string;
}

export type AdType = {
    _id: string;
    idUser: string;
    state: {        
        name: string;
    }
    status: boolean;            
    dateCreated: Date;
    title: string;
    category: {   
        _id: string;     
        name: string;
        slug: string;
        img: string;        
    }
    price: number;
    priceNegotiable: boolean;
    description: string;
    views: number;
    images: [{
        url: string;
        default: boolean;
    }];
    userInfo: {
        name: string;
        email: string;
    }
    others: OthersAdsType[],
    error?: string;
}

export type OthersAdsType = {    
    _id: string;
    title: string;
    price: number;
    priceNegotiable: boolean;
    image: string;    
}

export type JsonAds = {
    ads?: AdsType[];
    total?: number;
}

export type AdsType = {    
    _id: string;
    title: string;
    price: number;
    priceNegotiable: boolean;
    image: string;        
}

export type AdsOptionsType = {
    limit?: number;
    sort?: 'DESC' | 'ASC';
    offset?: number;
    q?: string;
    cat?: string;
    state?: string;
}

export type PriceValuesType = {
    formattedValue: string;
    value: string;
    floatValue: number;
}