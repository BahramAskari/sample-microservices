import axios, {AxiosResponse} from "axios"
import {CountryDto_Create_Payload, CountryDto_GetAll_Payload, CountryDto_Update_Payload} from "../../types/Dto/countries";
import {CountrySchema_Get} from "../../types/Schema/countries";
import {ProvinceSchema_Get} from "../../types/Schema/provinces";
import {CountryDto_GetProvinces_Payload} from "../../types/Dto/countries/provinces";
import {
    ProvinceDto_Create_Payload,
    ProvinceDto_GetAll_Payload,
    ProvinceDto_GetCountries_Payload,
    ProvinceDto_Update_Payload
} from "../../types/Dto/provinces";
import {ProvinceDto_GetCities_Payload} from "../../types/Dto/provinces/cities";
import {CitySchema_Get} from "../../types/Schema/cities";
import {CityDto_Create_Payload, CityDto_GetAll_Payload, CityDto_Update_Payload} from "../../types/Dto/cities";


export default class Location__Service {
    private ServiceURL: string = process.env.SERVICE_LOCATION_URL || "http://localhost:4012/api/v1"
    private static ServiceURL_CountriesRoute: string = process.env.SERVICE_LOCATION_URL + `/countries`
    private static ServiceURL_ProvincesRoute: string = process.env.SERVICE_LOCATION_URL + `/provinces`
    private static ServiceURL_CitiesRoute: string = process.env.SERVICE_LOCATION_URL + `/cities`

    constructor() {
    }

    /** Begin countries route **/
    static countries_list(payload: CountryDto_GetAll_Payload): Promise<AxiosResponse<{count: number; countries: CountrySchema_Get[];}>> {
        return axios.get(`${this.ServiceURL_CountriesRoute}`, {params: payload});
    }

    static countries_get(countryId: number): Promise<AxiosResponse<{country: CountrySchema_Get}>> {
        return axios.get(`${this.ServiceURL_CountriesRoute}/${countryId}`, {});
    }

    static countries_checkSlug(slug: string): Promise<AxiosResponse<boolean>> {
        return axios.get(`${this.ServiceURL_CountriesRoute}/check/slug/${slug}`, {});
    }

    static countries_checkSlugForCountry(countryId: number, slug: string): Promise<AxiosResponse<boolean>> {
        return axios.get(`${this.ServiceURL_CountriesRoute}/${countryId}/check/slug/${slug}`, {});
    }

    static countries_create(payload: CountryDto_Create_Payload): Promise<AxiosResponse<CountrySchema_Get>> {
        return axios.post(`${this.ServiceURL_CountriesRoute}`, payload, {});
    }

    static countries_update(countryId: number, payload: CountryDto_Update_Payload): Promise<AxiosResponse<CountrySchema_Get>> {
        return axios.put(`${this.ServiceURL_CountriesRoute}/${countryId}`, payload);
    }

    static countries_delete(countryId: number,): Promise<AxiosResponse<{deleted: boolean;}>> {
        return axios.delete(`${this.ServiceURL_CountriesRoute}/${countryId}`, {});
    }

    static countries_listProvinces(countryId: number, payload?: CountryDto_GetProvinces_Payload): Promise<AxiosResponse<{count: number; provinces: ProvinceSchema_Get[]; item: CountrySchema_Get}>> {
        return axios.get(`${this.ServiceURL_CountriesRoute}/${countryId}/provinces`, {params: payload});
    }

    static countries_addProvince(countryId: number, provinceId: number): Promise<AxiosResponse<undefined>> {
        return axios.post(`${this.ServiceURL_CountriesRoute}/${countryId}/province/${provinceId}`);
    }

    static countries_removeProvince(countryId: number, provinceId: number): Promise<AxiosResponse<undefined>> {
        return axios.delete(`${this.ServiceURL_CountriesRoute}/${countryId}/province/${provinceId}`);
    }
    /** End countries route **/

    /** Begin provinces route **/
    static provinces_list(payload: ProvinceDto_GetAll_Payload): Promise<AxiosResponse<{count: number; provinces: ProvinceSchema_Get[];}>> {
        return axios.get(`${this.ServiceURL_ProvincesRoute}`, {params: payload});
    }

    static provinces_get(provinceId: number): Promise<AxiosResponse<{province: ProvinceSchema_Get}>> {
        return axios.get(`${this.ServiceURL_ProvincesRoute}/${provinceId}`, {});
    }

    static provinces_checkSlug(slug: string): Promise<AxiosResponse<boolean>> {
        return axios.get(`${this.ServiceURL_ProvincesRoute}/check/slug/${slug}`, {});
    }

    static provinces_checkSlugForProvince(provinceId: number, slug: string): Promise<AxiosResponse<boolean>> {
        return axios.get(`${this.ServiceURL_ProvincesRoute}/${provinceId}/check/slug/${slug}`, {});
    }

    static provinces_create(payload: ProvinceDto_Create_Payload): Promise<AxiosResponse<ProvinceSchema_Get>> {
        return axios.post(`${this.ServiceURL_ProvincesRoute}`, payload, {});
    }

    static provinces_update(provinceId: number, payload: ProvinceDto_Update_Payload): Promise<AxiosResponse<ProvinceSchema_Get>> {
        return axios.put(`${this.ServiceURL_ProvincesRoute}/${provinceId}`, payload);
    }

    static provinces_delete(provinceId: number,): Promise<AxiosResponse<{deleted: boolean;}>> {
        return axios.delete(`${this.ServiceURL_ProvincesRoute}/${provinceId}`, {});
    }

    static provinces_listCities(provinceId: number, payload?: ProvinceDto_GetCities_Payload): Promise<AxiosResponse<{count: number; cities: CitySchema_Get[]; item: ProvinceSchema_Get}>> {
        return axios.get(`${this.ServiceURL_ProvincesRoute}/${provinceId}/cities`, {params: payload});
    }

    static provinces_addCity(provinceId: number, cityId: number): Promise<AxiosResponse<undefined>> {
        return axios.post(`${this.ServiceURL_ProvincesRoute}/${provinceId}/city/${cityId}`);
    }

    static provinces_removeCity(provinceId: number, cityId: number): Promise<AxiosResponse<undefined>> {
        return axios.delete(`${this.ServiceURL_ProvincesRoute}/${provinceId}/city/${cityId}`);
    }
    /** End provinces route **/

    /** Begin provinces route **/
    static cities_list(payload: CityDto_GetAll_Payload): Promise<AxiosResponse<{count: number; cities: CitySchema_Get[];}>> {
        return axios.get(`${this.ServiceURL_CitiesRoute}`, {params: payload});
    }

    static cities_get(cityId: number): Promise<AxiosResponse<{city: CitySchema_Get}>> {
        return axios.get(`${this.ServiceURL_CitiesRoute}/${cityId}`, {});
    }

    static cities_create(payload: CityDto_Create_Payload): Promise<AxiosResponse<CitySchema_Get>> {
        return axios.post(`${this.ServiceURL_CitiesRoute}`, payload, {});
    }

    static cities_update(cityId: number, payload: CityDto_Update_Payload): Promise<AxiosResponse<CitySchema_Get>> {
        return axios.put(`${this.ServiceURL_CitiesRoute}/${cityId}`, payload);
    }

    static cities_delete(cityId: number,): Promise<AxiosResponse<{deleted: boolean;}>> {
        return axios.delete(`${this.ServiceURL_CitiesRoute}/${cityId}`, {});
    }
    /** End provinces route **/


}