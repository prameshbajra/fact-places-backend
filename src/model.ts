type TError = {
    statusCode: number,
    message: string
}


type TAddress = {
    road: string;
    neighbourhood?: string;
    suburb?: string;
    city_district?: string;
    city: string;
    municipality: string;
    county: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
};

type TPlace = {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    address: TAddress;
    boundingbox: string[];
};

type TInterestPlace = {
    name: string;
    description: string;
}

export { TError, TPlace, TInterestPlace };

