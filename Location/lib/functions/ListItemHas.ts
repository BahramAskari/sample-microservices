import {isEmpty, isNil} from "lodash";
import {stringToBoolean} from "./HotFunctions";

const list_itemHas = (item?:{has?: boolean | any}): boolean | undefined => {
    /*
    console.log(`\n\n\n\n\n\n`)
    console.log(`Current value is: `, item.has)
    console.log(`is accessible ? : `, !isNil(item) && !isNil(item.has) && !isEmpty(item) && !isEmpty(item.has))
    console.log(`too Boolean -> `, stringToBoolean(item.has))
    console.log(`\n\n\n\n\n\n`)
     */
    return (
        !isNil(item) && !isNil(item.has) && !isEmpty(item) /* && !isEmpty(item.has) */
    ) ? stringToBoolean(item.has): undefined;
}

export default list_itemHas;