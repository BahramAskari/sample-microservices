import axios, {AxiosResponse} from "axios"
import {TagDto_Create_Payload, TagDto_GetAll_Payload, TagDto_Update_Payload} from "../../types/Dto/tags";
import {TagSchema_Get} from "../../types/Schema/tags";


export default class Categorization__Service {
    private ServiceURL: string = process.env.SERVICE_CATEGORIZATION_URL || "http://localhost:4010/api/v1"
    private static ServiceURL_TagsRoute: string = process.env.SERVICE_CATEGORIZATION_URL + `/tags`

    constructor() {
    }

    /** Begin tags route **/
    static tags_list(payload: TagDto_GetAll_Payload): Promise<AxiosResponse<{count: number; tags: TagSchema_Get[];}>> {
        console.log(this.ServiceURL_TagsRoute)
        return axios.get(`${this.ServiceURL_TagsRoute}`, {params: payload});
    }

    static tags_get(tagId: number): Promise<AxiosResponse<{tag: TagSchema_Get}>> {
        return axios.get(`${this.ServiceURL_TagsRoute}/${tagId}`, {});
    }


    static tags_create(payload: TagDto_Create_Payload): Promise<AxiosResponse<TagSchema_Get>> {
        return axios.post(`${this.ServiceURL_TagsRoute}`, payload, {});
    }

    static tags_update(tagId: number, payload: TagDto_Update_Payload): Promise<AxiosResponse<TagSchema_Get>> {
        return axios.put(`${this.ServiceURL_TagsRoute}/${tagId}`, payload);
    }

    static tags_delete(tagId: number,): Promise<AxiosResponse<{deleted: boolean;}>> {
        return axios.delete(`${this.ServiceURL_TagsRoute}/${tagId}`, {});
    }
    /** End tags route **/


}