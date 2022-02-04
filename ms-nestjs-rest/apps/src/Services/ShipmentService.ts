import { Injectable } from '@nestjs/common';
import { AxiosService } from './AxiosService';
import ShipmentRequestController from '../Models/Request/shipment/ShipmentRequestController';
import ShipmentWebServiceRequest from '../Models/Request/SkyDropx/ShipmentWebServiceRequest';
//import { ShimpmentWebServiceResponse } from '../Models/Response/SkyDropx/ShipmentWebServiceResponse';
import { ClassesWebServiceResponse } from '../Models/Response/SkyDropx/ClassesWebServiceResponse';
import HttpCustomException from '../Exceptions/HttpCustomException';
import { StatusCodeEnums, StatusCodeExceptionText } from '../Enums/StatusCodeEnums';
import { ShimpmentWebServiceResponse } from '../Models/Response/SkyDropx/ShipmentWebServiceResponse';
import { ServiceHelper } from '../Helpers/SkyDropx/ServiceHelper';
import { Logger } from '../Config/LoggerConfig';
import { LabelWebServiceRequest } from '../Models/Request/SkyDropx/LabelWebServiceRequest';
import { LabelWebServiceResponse } from '../Models/Response/SkyDropx/LabelWebServiceResponse';

@Injectable()
export class ShipmentService extends AxiosService{
  constructor(
 
  ) { 
      super()
  }


  async getClasses(idSubCategory:string):Promise<ClassesWebServiceResponse>{
    const url: string = `${process.env.SKY_DROPX_URL}/v1/consignment_notes/subcategories/${idSubCategory}/classes`;
    const headers = { 'Content-Type':'application/json', 'Authorization':`Token token=${process.env.SKY_DROPX_TOKEN}`}
    const config = this.buildAxiosRequestConfig(headers);
    return await this.get<ClassesWebServiceResponse>(url, config);
  }

  async createShipment(shipmentWebServiceRequest:ShipmentWebServiceRequest):Promise<ShimpmentWebServiceResponse>{
    const url: string = `${process.env.SKY_DROPX_URL}/v1/shipments`;
    const headers = { 'Content-Type':'application/json', 'Authorization':`Token token=${process.env.SKY_DROPX_TOKEN}`}
    const config = this.buildAxiosRequestConfig(headers);
    return await this.post<ShimpmentWebServiceResponse>(url, shipmentWebServiceRequest, config);
  }  

  async createLabel(labelWebServiceRequest:LabelWebServiceRequest):Promise<LabelWebServiceResponse>{
    const url: string = `${process.env.SKY_DROPX_URL}/v1/labels`;
    const headers = { 'Content-Type':'application/json', 'Authorization':`Token token=${process.env.SKY_DROPX_TOKEN}`}
    const config = this.buildAxiosRequestConfig(headers);
    return await this.post<LabelWebServiceResponse>(url, labelWebServiceRequest, config);
  }

  private completeNameWithDots(name:string):string{
    const MIN_CHARACTER=5
    if(name.length>=MIN_CHARACTER)
        return name
    const missingCharacters=MIN_CHARACTER-name.length
    for(let n:number=0;n<missingCharacters;n++)
        name+='.'
    return name
  }

  async createShipmentAndLabel(data:ShipmentRequestController){
        let classesResponse:ClassesWebServiceResponse=await this.getClasses(data.consignment_note_subcategory_code)
        let classResponse=classesResponse.data.filter((value):boolean=>{
            return value.attributes.code==data.consignment_note_class_code
        })
        if(classResponse.length<1){
            Logger.message.error("There isn't any class for the class_code sended")
            throw new HttpCustomException(StatusCodeExceptionText[StatusCodeEnums.CLASS_NOT_FOUND] ,StatusCodeEnums.CLASS_NOT_FOUND)
        }
        let content:string=this.completeNameWithDots(classResponse[0].attributes.name)
        let shipmentWebServiceRequest:ShipmentWebServiceRequest=new ShipmentWebServiceRequest()        
        shipmentWebServiceRequest.buildFromShipmentRequest(data,content)
        let shipmentResponse:ShimpmentWebServiceResponse =await this.createShipment(shipmentWebServiceRequest)
        let rates= shipmentResponse.included.filter((value)=>{
            if(value.type!="rates")
                return false
            return ServiceHelper.verifyServiceLevelCourier(data.service_tag,value.attributes.service_level_code)
        })
        if(rates.length<1){
            Logger.message.error("There isn't any rate for the class_code sended")
            throw new HttpCustomException(StatusCodeExceptionText[StatusCodeEnums.CLASS_NOT_FOUND] ,StatusCodeEnums.CLASS_NOT_FOUND)
        }
        let label:LabelWebServiceResponse=await this.createLabel(new LabelWebServiceRequest(parseInt(rates[0].id),"pdf"))
        if(label.data.attributes.status=="ERROR"){
            Logger.message.error("Skydropx sent Error at the moment of creating a label")
            throw new HttpCustomException(StatusCodeExceptionText[StatusCodeEnums.ERROR_CREATING_LABEL] ,StatusCodeEnums.ERROR_CREATING_LABEL)
        }
        console.log(label)
    }
}
