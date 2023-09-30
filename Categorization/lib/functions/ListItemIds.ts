import {isNil} from "lodash";


const list_itemIds = (ids: number[] | undefined, id: number): number[] => {
    return !isNil(ids) ? [...ids, id]: [id]
}

export default list_itemIds;