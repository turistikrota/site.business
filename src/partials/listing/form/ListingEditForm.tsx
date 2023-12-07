import React from 'react'
import {ListingDetails} from "@/api/listing/listing.api.ts";

type Props = {
    details: ListingDetails
    onOk: () => void
}

const ListingEditForm: React.FC<Props> = ({details, onOk}) => {
    return <></>
}

export default ListingEditForm
