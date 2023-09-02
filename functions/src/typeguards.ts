import { TError, TPlace } from "./model";

const isTPlace = (obj: TPlace | TError): obj is TPlace => {
    return "place_id" in obj;
};

export { isTPlace };

