import {isArray, isBoolean, isEmpty, isNil, isNumber, isString, toString, upperFirst, lowerFirst,} from "lodash";
import {ListFilters} from "../../api/types";

export const stringToBoolean = ( booleanString: string|number|boolean ): boolean|undefined => {
    //  if ([1,2,"4"].includes("1"))
    if (
        booleanString === 1 ||
        booleanString === true ||
        booleanString === "1" ||
        booleanString === "true" ||
        booleanString === "yes" ||
        booleanString === "ok" ||
        booleanString === "on"
    ) {
        return true;
    } else if (
        booleanString === 0 ||
        booleanString === false ||
        booleanString === "0" ||
        booleanString === "false" ||
        booleanString === "no" ||
        booleanString === "off"
    ) {
        return false;
    }
    return undefined;
}



export const stringToArray = (string: string|number|number[]|string[]|undefined, asNumber: boolean = true )=>{
    if (string === undefined) return undefined;
    if ( isArray(string) ) return string
    
    let array = toString(string).split(",") as any[];
    return array.filter(item=> !isEmpty(item))
    return array;
}

export const string_artArtistsToArray = (string: any, asNumber: boolean = true)=>{
  //  const object = stringToArray(string); // {...}, {...}, ...
    if ( isArray(string) ) return string



    let array = JSON.parse("[" + string + "]")
    //let array = asNumber? JSON.parse("[" + string + "]"): ;
    return array;
}


export const listItemFilterToObject = (item?: {has?: boolean; ids?: number[]}): {has?: boolean; ids?: number[]} | undefined=>{
    if (!isNil(item)) {
     
        const ids = !isNil(item.ids) ? stringToArray(item.ids): []
        return {
            ...( !isNil(item.has) && !isEmpty(String(item.has)) && !isNil( stringToBoolean(item.has) ) ) && {has: stringToBoolean(item.has)},
            ...( (isNil(item.has) || isEmpty(String(item.has)) || isNil(stringToBoolean(item.has))) && !isEmpty(ids) ) && {has: true},
            //...!isNil(item.has) && {has: stringToBoolean(item.has)},
//            has: ( !isNil(item.has) && !isNil( stringToBoolean(item.has) ) ) ? stringToBoolean(item.has): !isEmpty(ids) ? true: undefined ,
            ids,
        };
    }
    return undefined
}

const listFilterMapper = (filters: ListFilters) => {
    let limit = (  !isNil(filters.itemsPerPage) && isNumber(filters.itemsPerPage)  ) ? filters.itemsPerPage: 20;
    let page = Number(filters.page) > 0 ? Number(filters.page): 1
    let offset = Number(limit) * (page-1)
    filters.isDeleted = stringToBoolean(filters.isDeleted)
    filters.includeDeleted = stringToBoolean(filters.includeDeleted)

    return filters
}


export const checkArrayIncludesOther = (subArray: any[], includerArray: any[]) => {
    return !subArray.some(r=> includerArray.indexOf(r) == -1)
    //  return subArray.some(r=> includerArray.includes(r))
};

export const pureComparedArrayItems = (originalArray: any[], toRemove: any[]) => {
    return originalArray.filter( ( el ) => !toRemove.includes( el ) );
};