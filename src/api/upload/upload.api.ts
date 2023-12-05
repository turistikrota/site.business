import {httpClient} from "@/http/client.tsx";
import {apiUrl, Services} from "@/config/services.ts";

export const uploadProfileAvatar = async(formData: FormData) : Promise<any> => {
    return httpClient.post(apiUrl(Services.Upload, `/business/avatar`), formData)
}

export const uploadProfileCover = async(formData: FormData) : Promise<any> => {
    return httpClient.post(apiUrl(Services.Upload, `/business/cover`), formData)
}