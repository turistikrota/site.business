import {httpClient} from "@/http/client.tsx";
import {apiUrl, Services} from "@/config/services.ts";

export enum BusinessTypes {
    Individual = 'individual',
    Corporation = 'corporation',
}

export type IndividualBusinessDetails = {
    businessType: BusinessTypes.Individual
    details: {
        firstName: string
        lastName: string
        province: string
        district: string
        address: string
        birthDate: string
    }
}

export type CorporationBusinessDetails = {
    businessType: BusinessTypes.Corporation
    details: {
        address: string
        district: string
        province: string
        type: string
    }
}

export type BusinessDetails = {
    nickName: string
    realName: string
    isVerified: boolean
    isEnabled: boolean
    isDeleted: boolean
    verifiedAt: string
    updatedAt: string
    createdAt: string
} & (IndividualBusinessDetails | CorporationBusinessDetails)

export const fetchMyBusiness = async (nickName: string): Promise<BusinessDetails | undefined> => {
    const res = await httpClient.get(apiUrl(Services.Business, `/~${nickName}`)).catch(() => ({ data: undefined }))
    return res.data
}
