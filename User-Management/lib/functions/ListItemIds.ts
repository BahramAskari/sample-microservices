import {isNil} from "lodash";


const list_itemIds = (ids: number[] | undefined, id: number): number[] => {
    /*
    if (!isNil(ids)) {
        return [...ids, id]
    }
    return [id]
     */
    return !isNil(ids) ? [...ids, id]: [id]
}

export default list_itemIds;