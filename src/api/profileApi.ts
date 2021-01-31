import axios, {AxiosPromise} from "axios";
import {CategoriesType} from "../component/accounts/Profile/ProfileEdit/ProfileEditContainer";
import {RequestForProposals} from "../Frequently_used_types";
import {config2} from "../api";

type SingleDocument = {
        id: number,
        Title: string,
        Thumbnail: string,
        Download: string,
        owner: number
    }
type SingleProfile = {
        id: number,
        companyProfilePicture: string,
        companyName: string,
        companyDescription: string,
        country: string,
        companyLogo: string,
        sections: string,
        owner: number
    }

export const instance = axios.create({
    baseURL: 'https://jollyteam.herokuapp.com/api/',
});
export const profileAPI = {

   PostProfile: (data: {CompanyName : string, companyLogo: any, CompanyDescriptions: string, section: {}, owner: number}) => {
       debugger
       let form_data = new FormData();
       form_data.append('owner', String(data.owner));
       form_data.append('companyName', String(data.CompanyName));
       form_data.append('companyDescription', String(data.CompanyDescriptions));
       form_data.append('sections', JSON.stringify(data.section));
       form_data.append('companyLogo', data.companyLogo, data.companyLogo.name)
       return instance.post<SingleProfile>('CompanyProfilePage/', form_data, config2)
   },

   PutProfile: (form_data: {
       companyDescription: string,
       companyLogo: string,
       companyName: string,
       companyProfilePicture: string,
       country: string,
       id: number,
        owner: number,
        sections: string
    }, id: number) => {
        debugger
       return instance.patch<SingleProfile>(`CompanyProfilePage/${id}/`, form_data, config2)
    },
    PatchDocuments: (form_data: {
        Download: string,
        Thumbnail: string,
        Title: string,
        id: number,
        owner: number
    }, id: number) => {
        return instance.patch<SingleDocument>(`Document/${id + 1}/`, form_data, config2)
    },
    PostDocuments: (id: any) => {
        let form_data = new FormData();
        form_data.append('owner', String(id));
        return instance.post<SingleDocument>(`Document/`, form_data, config2)
    },
    DeleteDocuments: (id: number) => {
        return instance.delete<AxiosPromise>(`Document/${id + 1}/`)
    },
    getCountries: () => {
        debugger
        return axios.get('http://restcountries.eu/rest/v2/all')
    },
    getProfile: () => {
        return instance.get<Array<SingleProfile>>('CompanyProfilePage/')
    },
    getDocuments: () => {

        return instance.get<Array<SingleDocument>>('Document/')
    },
    getCategory: () => {
        return instance.get<CategoriesType>("Category/")
    },
    getSearchedData: (search: string) => {
        debugger
        return instance.get<Array<SingleProfile>>(`CompanyProfilePage?search=${search}`)
    },
    postRequestForProposals: (request: any) => {
        return instance.post<Array<RequestForProposals>>('RequestForProposals/', request)
    },
    getPaymentMethods: () => {
        return instance.get('PaymentMethods/')
    }
}