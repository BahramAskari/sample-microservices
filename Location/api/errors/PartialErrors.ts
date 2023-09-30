import { CustomError } from "./CustomError";
import {isArray, isEmpty} from "lodash";

export class PartialErrors extends CustomError {
    statusCode = 402;       //  partially done. but not completed
    static Errors: PartialErrors_type = []
    private static errors: PartialErrors_type = []
    //private static errors: string[];

    //  constructor(errors?: PartialErrors_type){
    constructor(public errors: PartialErrors_type){
       // errors && PartialErrors.Errors.push(...errors)

        //errors ? PartialErrors.Errors.push(...error): PartialErrors.Errors.push(error)
        super('Route not found');
        /*
        if(errors) {
            PartialErrors.Errors.push(...errors)
            PartialErrors.errors.push(...errors)
            //this.errors.push(...PartialErrors.Errors)
        } else {
            PartialErrors.errors = PartialErrors.Errors
        }
         */
        Object.setPrototypeOf(this, PartialErrors.prototype);

        //  PartialErrors.Errors = [...PartialErrors.Errors, ...errors]
    }

    /*
    public static addError (error: string|string[]) {
        isArray(error) ?
            PartialErrors.Errors.push(...error)
           :
            this.ERRORS.push(error)
    }
     */

    static hasError(): boolean {
        return !isEmpty(this.errors)
    }

    // @ts-ignore
   serializeErrors(): PartialErrors_type {
           return  this.errors
   }


}


/*      User      */
type Partials_RelateAssociation_NotExist_User = {
    item: "User"
    association: "Role"|"LoginSession"
    //association: keyof Pick<User__Input, "roles"|"permissions"|"departments"|"tickets"|"addresses"|"playlists">
}
/*      Country      */
type Partials_RelateAssociation_NotExist_Country = {
    item: "Country"
    association: "Province"
    //association: keyof Pick<Country__Input, "provinces"|"languages"|"songs">
}
/*      Province      */
type Partials_RelateAssociation_NotExist_Province = {
    item: "Province"
    association: "City"
    //association: keyof Pick<Province__Input, "cities">
}
type Partials_SetAssociation_NotExist_Province = {
    item: "Province"
    association: "Country"
}
/*      City      */


/**
 * @Methods: create
 */
/*   UnCompleted    */
type Partials_Create_UnCompleted = { code: "create:UnCompleted" }
/*   Image watermark    */
type Partials_Create_ImageWatermark = { code: "create:ImageWatermark"; image: "Avatar"|"Logo"|"Cover"|"Attachment" }
/*   Image copy    */
type Partials_Create_ImageCopy = { code: "create:ImageCopy"; image: "Avatar"|"Logo"|"Cover"|"Attachment" }
/*   Image squared    */
type Partials_Create_ImageSquared = { code: "create:ImageSquared"; image: "Avatar"|"Logo"|"Cover"|"Attachment"; minWidth: number; maxWidth: number; }

/**
 * @Methods: uploadFile
 */
/*   UnCompleted    */
type Partials_UploadFile_UnCompleted = { code: "uploadFile:UnCompleted" }
/*   Image watermark    */
type Partials_UploadFile_ImageWatermark = { code: "uploadFile:ImageWatermark"; image: "Avatar"|"Logo"|"Cover"|"Attachment" }
/*   Image copy    */
type Partials_UploadFile_ImageCopy = { code: "uploadFile:ImageCopy"; image: "Avatar"|"Logo"|"Cover"|"Attachment" }
/*   Image squared    */
type Partials_UploadFile_ImageSquared = { code: "uploadFile:ImageSquared"; image: "Avatar"|"Logo"|"Cover"|"Attachment"; minWidth: number; maxWidth: number; }


/**
 * @Methods: updateOne
 */
/*   UnCompleted    */
type Partials_UpdateOne_UnCompleted = { code: "updateOne:UnCompleted" }


/**
 * @Methods: updateField
 */
/*   UnCompleted    */
type Partials_UpdateField_UnCompleted = { code: "updateField:UnCompleted" }

/**
 * @Methods: updateMany
 */
/*   EmptyIds    */
type Partials_UpdateMany_EmptyIds = { code: "updateMany:EmptyIds" }


/**
 * @Methods: addAssociation | removeAssociation
 */
/*   NotExist    */
type Partials_RelateAssociation_notExist = {
    code: "addAssociation:NotExist"|"removeAssociation:NotExist"//|"addAssociations:NotExist"|"removeAssociations:NotExist"
    id: number
} & (
    Partials_RelateAssociation_NotExist_User
    |Partials_RelateAssociation_NotExist_Country
    |Partials_RelateAssociation_NotExist_Province
    )

/**
 * @Methods: addAssociations | removeAssociations
 */
/*   NotExist    */
type Partials_RelateAssociations_notExist = {
    code: "addAssociations:NotExist"|"removeAssociations:NotExist"//|"addAssociations:NotExist"|"removeAssociations:NotExist"
    id: number
} & (
    Partials_RelateAssociation_NotExist_User
    |Partials_RelateAssociation_NotExist_Country
    |Partials_RelateAssociation_NotExist_Province
    )
//} & (Partials_AddAssociation_NotExist|Partials_RemoveAssociation_NotExist)
/**
 * @Methods: setAssociation
 */
/*   NotExist    */
type Partials_SetAssociation_notExist = {
    code: "setAssociation:NotExist"
    id: number
} & (
    Partials_SetAssociation_NotExist_Province
    )
/**
 * @Methods: deleteAssociation
 */
/*   NotExist    */
type Partials_DeleteAssociation_notExist = {
    code: "deleteAssociation:NotExist"
    id: number
}

/**
 * @Methods: Access Denied
 */
type Partials_Access_Denied = { code: "Access:Denied"; /*endpoint: string;*/ }




export type Partials_RelateAssociation = (Partials_RelateAssociation_notExist)
export type Partials_RelateAssociations = (Partials_RelateAssociations_notExist)
export type Partials_RelateAssociationWithRelated = (Partials_RelateAssociation_notExist)
//export type Partials_UpdateDefaultAssociation = (Partials_UpdateDefaultAssociation_UnCompleted)
export type Partials_SetAssociation = (Partials_SetAssociation_notExist)
export type Partials_DeleteAssociation = (Partials_DeleteAssociation_notExist)
export type Partials_UpdateOne = (Partials_UpdateOne_UnCompleted)
export type Partials_UpdateField = (Partials_UpdateField_UnCompleted)
export type Partials_UpdateMany = (Partials_UpdateMany_EmptyIds)
export type Partials_Create = (Partials_Create_UnCompleted|Partials_Create_ImageWatermark|Partials_Create_ImageCopy|Partials_Create_ImageSquared)
export type Partials_UploadFile = (Partials_UploadFile_UnCompleted|Partials_UploadFile_ImageWatermark|Partials_UploadFile_ImageCopy|Partials_UploadFile_ImageSquared)
export type Partials_Access = Partials_Access_Denied


export type PartialErrors_type = (
    Partials_RelateAssociation
    |Partials_RelateAssociations
    |Partials_SetAssociation|Partials_DeleteAssociation
    //|Partials_UpdateDefaultAssociation
    |Partials_Create
    |Partials_UpdateOne|Partials_UpdateField
    |Partials_UploadFile
    |Partials_UpdateMany
    //|Partials_Access
    )[] | Partials_Access