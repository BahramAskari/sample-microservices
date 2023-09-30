import axios, {AxiosResponse} from "axios"
import {UserDto_Create_Payload, UserDto_GetAll_Payload, UserDto_Update_Payload} from "../../types/Dto/users";
import {UserSchema_Get} from "../../types/Schema/users";
import {RoleSchema_Get} from "../../types/Schema/roles";
import {UserDto_GetRoles_Payload} from "../../types/Dto/users/roles";
import {
    RoleDto_Create_Payload,
    RoleDto_GetAll_Payload,
    RoleDto_GetUsers_Payload,
    RoleDto_Update_Payload
} from "../../types/Dto/roles";


export default class UserManagement__Service {
    private ServiceURL: string = process.env.SERVICE_USERMANAGEMENT_URL || "http://localhost:4014"
    private static ServiceURL_UsersRoute: string = process.env.SERVICE_USERMANAGEMENT_URL + `/users`
    private static ServiceURL_RolesRoute: string = process.env.SERVICE_USERMANAGEMENT_URL + `/roles`

    constructor() {
    }

    /** Begin users route **/
    static users_list(payload: UserDto_GetAll_Payload): Promise<AxiosResponse<{count: number; users: UserSchema_Get[];}>> {
        return axios.get(`${this.ServiceURL_UsersRoute}`, {params: payload});
    }

    static users_get(userId: number): Promise<AxiosResponse<{user: UserSchema_Get}>> {
        return axios.get(`${this.ServiceURL_UsersRoute}/${userId}`, {});
    }

    static users_checkUsername(username: string): Promise<AxiosResponse<boolean>> {
        return axios.get(`${this.ServiceURL_UsersRoute}/check/username/${username}`, {});
    }

    static users_checkUsernameForUser(userId: number, username: string): Promise<AxiosResponse<boolean>> {
        return axios.get(`${this.ServiceURL_UsersRoute}/${userId}/check/username/${username}`, {});
    }

    static users_checkEmail(email: string): Promise<AxiosResponse<boolean>> {
        return axios.get(`${this.ServiceURL_UsersRoute}/check/email/${email}`, {});
    }

    static users_checkEmailForUser(userId: number, email: string): Promise<AxiosResponse<boolean>> {
        return axios.get(`${this.ServiceURL_UsersRoute}/${userId}/check/email/${email}`, {});
    }

    static users_create(payload: UserDto_Create_Payload): Promise<AxiosResponse<UserSchema_Get>> {
        return axios.post(`${this.ServiceURL_UsersRoute}`, payload, {});
    }

    static users_update(userId: number, payload: UserDto_Update_Payload): Promise<AxiosResponse<UserSchema_Get>> {
        return axios.put(`${this.ServiceURL_UsersRoute}/${userId}`, payload);
    }

    static users_delete(userId: number,): Promise<AxiosResponse<{deleted: boolean;}>> {
        return axios.delete(`${this.ServiceURL_UsersRoute}/${userId}`, {});
    }

    static users_listRoles(userId: number, payload?: UserDto_GetRoles_Payload): Promise<AxiosResponse<{count: number; roles: RoleSchema_Get[]; item: UserSchema_Get}>> {
        return axios.get(`${this.ServiceURL_UsersRoute}/${userId}/roles`, {params: payload});
    }

    static users_addRole(userId: number, roleId: number): Promise<AxiosResponse<undefined>> {
        return axios.post(`${this.ServiceURL_UsersRoute}/${userId}/role/${roleId}`);
    }

    static users_removeRole(userId: number, roleId: number): Promise<AxiosResponse<undefined>> {
        return axios.delete(`${this.ServiceURL_UsersRoute}/${userId}/role/${roleId}`);
    }
    /** End users route **/

    /** Begin roles route **/
    static roles_list(payload: RoleDto_GetAll_Payload): Promise<AxiosResponse<{count: number; roles: RoleSchema_Get[];}>> {
        return axios.get(`${this.ServiceURL_RolesRoute}`, {params: payload});
    }

    static roles_get(roleId: number): Promise<AxiosResponse<{role: RoleSchema_Get}>> {
        return axios.get(`${this.ServiceURL_RolesRoute}/${roleId}`, {});
    }

    static roles_create(payload: RoleDto_Create_Payload): Promise<AxiosResponse<RoleSchema_Get>> {
        return axios.post(`${this.ServiceURL_RolesRoute}`, payload, {});
    }

    static roles_update(roleId: number, payload: RoleDto_Update_Payload): Promise<AxiosResponse<RoleSchema_Get>> {
        return axios.put(`${this.ServiceURL_RolesRoute}/${roleId}`, payload);
    }

    static roles_delete(roleId: number,): Promise<AxiosResponse<{deleted: boolean;}>> {
        return axios.delete(`${this.ServiceURL_RolesRoute}/${roleId}`, {});
    }

    static roles_listUsers(roleId: number, payload?: RoleDto_GetUsers_Payload): Promise<AxiosResponse<{count: number; roles: UserSchema_Get[]; item: RoleSchema_Get}>> {
        return axios.get(`${this.ServiceURL_RolesRoute}/${roleId}/roles`, {params: payload});
    }

    static roles_addUser(roleId: number, userId: number): Promise<AxiosResponse<undefined>> {
        return axios.post(`${this.ServiceURL_RolesRoute}/${roleId}/user/${userId}`);
    }

    static roles_removeUser(roleId: number, userId: number): Promise<AxiosResponse<undefined>> {
        return axios.delete(`${this.ServiceURL_RolesRoute}/${roleId}/user/${userId}`);
    }
    /** End roles route **/


}