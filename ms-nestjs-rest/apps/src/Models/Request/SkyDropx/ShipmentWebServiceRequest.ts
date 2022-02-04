import { ParcelEnumsDictionary } from "apps/src/Enums/ParcelEnum";
import ShipmentRequestController from "../shipment/ShipmentRequestController";
import ParcelWebServiceRequest from "./ParcelWebServiceRequest";

class Address{
    province:string;
    city:string;
    name:string;
    zip:string;
    country:string;
    address1:string
    address2:string
    company:string
    phone:string
    email:string
    reference:string
}

class AddressTo extends Address{
    content:string
}

class Parcel{
    weight:number
    distance_unit:string 
    mass_unit:string
    height:number
    width:number
    length:number
}


export default class ShipmentWebServiceRequest{
    consignment_note_class_code:string
    address_from:Address
    address_to:AddressTo
    parcels: Parcel[]
    
    constructor(){

    }

    buildFromShipmentRequest(shipment:ShipmentRequestController,content:string){
        this.consignment_note_class_code=shipment.consignment_note_class_code
        
        this.address_from= new Address()
        this.address_from.address1=shipment.address_from.address1
        this.address_from.address2=shipment.address_from.address2
        this.address_from.city=shipment.address_from.city
        this.address_from.company=shipment.address_from.company
        this.address_from.country=shipment.address_from.country
        this.address_from.email=shipment.address_from.email
        this.address_from.name=shipment.address_from.name
        this.address_from.phone=shipment.address_from.phone
        this.address_from.province=shipment.address_from.province
        this.address_from.zip=shipment.address_from.zip

        this.address_to=new AddressTo()
        this.address_to.address1=shipment.address_to.address1
        this.address_to.address2=shipment.address_to.address2
        this.address_to.city=shipment.address_to.city
        this.address_to.company=shipment.address_to.company
        this.address_to.country=shipment.address_to.country
        this.address_to.email=shipment.address_to.email
        this.address_to.name=shipment.address_to.name
        this.address_to.phone=shipment.address_to.phone
        this.address_to.province=shipment.address_to.province
        this.address_to.zip=shipment.address_to.zip
        this.address_to.content=content

        let parcelWebServiceRequest:ParcelWebServiceRequest= ParcelEnumsDictionary[shipment.parcel_tag]
        
        let parcel:Parcel= new Parcel()
        parcel.distance_unit="CM"
        parcel.mass_unit="KG"
        parcel.height=parseInt(parcelWebServiceRequest.height)
        parcel.weight=parseInt(parcelWebServiceRequest.weight)
        parcel.width=parseInt(parcelWebServiceRequest.width)
        parcel.length=parseInt(parcelWebServiceRequest.length)
        this.parcels=[parcel]
    }
}

