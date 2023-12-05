import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {useToast} from "@turistikrota/ui/toast";
import {uploadProfileAvatar} from "@/api/upload/upload.api.ts";
import {parseApiError} from "@turistikrota/ui/utils/response";
import {toFormData} from "@turistikrota/ui/utils/transform";
import Spin from "sspin";
import {makeBusinessAvatar} from "@/utils/cdn.ts";
import ImageUploaderWithCropper from "@/components/image/ImageUploaderWithCropper.tsx";

type Props = {
    nickName: string
    onOk: () => void
}

const BusinessProfileImageUploadSection: FC<Props> = ({nickName, onOk}) => {
    const {t} = useTranslation('edit')
    const [src, setSrc] = useState(makeBusinessAvatar(nickName))
    const [inputError, setInputError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const onUpload = (formData: FormData) => {
        setIsLoading(true)
        uploadProfileAvatar(formData)
            .then(res => {
                if (res && res.status && [200, 201].includes(res.status)) {
                    toast.success(t('uploads.success'))
                    onOk()
                }
            })
            .catch((err) => {
                if (err && err.response && err.response.data) return parseApiError({error: err.response.data, toast})
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleUploadAvatar = (file: File) => {
        if (!file) return setInputError(t('uploads.required').toString())
        onUpload(toFormData({avatar: file}))
    }

    return <section className="flex flex-col items-center relative">
        <Spin loading={isLoading}>
            <div className="flex items-center justify-center">
                <img
                    src={src}
                    alt={t('uploads.avatar')}
                    title={t('uploads.avatar')}
                    width={150}
                    height={150}
                    className='object-cover w-40 h-40 md:w-48 md:h-48 rounded-md bg-second border hover:shadow-md transition-shadow'
                />
            </div>
        </Spin>
        <ImageUploaderWithCropper src={src} onSrcChange={setSrc} onChange={handleUploadAvatar}
                                  buttonText={t('uploads.avatar')} error={inputError} onError={setInputError}
        />
    </section>
}

export default BusinessProfileImageUploadSection