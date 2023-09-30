import {isEmpty, isNil} from "lodash";
import {stringToBoolean} from "./HotFunctions";

const list_itemHas = (item?:{has?: boolean | any}): boolean | undefined => {
    return (
        !isNil(item) && !isNil(item.has) && !isEmpty(item) /* && !isEmpty(item.has) */
    ) ? stringToBoolean(item.has): undefined;
}

export default list_itemHas;