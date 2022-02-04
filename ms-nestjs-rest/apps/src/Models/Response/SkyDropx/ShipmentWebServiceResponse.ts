class AttributesIncluded{
    length:string
    height:string
    width:string
    weight:string
    mass_unit:string
    distance_unit:string

    created_at:Date
    updated_at:Date
    amount_local:string
    currency_local:string
    provider:string
    service_level_name:string
    service_level_code:string
    service_level_terms: any
    days:number
    duration_terms:any
    zone: any
    arrives_by: any
    out_of_area: boolean
    out_of_area_pricing:string
    total_pricing:string
    is_occure: boolean
}

class Included{
    id:string;
    type:string;
    attributes:AttributesIncluded
}

class ShimpmentWebServiceResponse {
    data:any
    included:Included[]
}   

export {AttributesIncluded,Included,ShimpmentWebServiceResponse}