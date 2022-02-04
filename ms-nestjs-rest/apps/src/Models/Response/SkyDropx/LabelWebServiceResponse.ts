class AttributesLabel{
    created_at:Date
    updated_at:Date
    status: null
    tracking_number:string
    tracking_status:any
    label_url:string
    tracking_url_provider:string
    rate_id:number
}

class Data{
    id:string;
    type:string
    attributes:AttributesLabel
}

export class LabelWebServiceResponse{
    data:Data
}
