import { Injectable } from '@nestjs/common';
import QuotationWebServiceRequest from '../Models/Request/SkyDropx/QuotationsWebServicesRequest';
import QuotationControllerRequest from '../Models/Request/QuotationController/QuotationControllerRequest';
import { AxiosService } from './AxiosService';
import QuotationsResponse from '../Models/Response/SkyDropx/QuotationsResponse';
import { ParcelEnumsDictionary } from '../Enums/ParcelEnum';
import PostalCodeHelper from '../Helpers/SkyDropx/PostalCodeHelper';
import { Logger } from '../Config/LoggerConfig';
import { StatusCodeEnums, StatusCodeExceptionText } from '../Enums/StatusCodeEnums';
import HttpCustomException from '../Exceptions/HttpCustomException';
import { ServiceHelper } from '../Helpers/SkyDropx/ServiceHelper';

@Injectable()
export class QuotationService extends AxiosService{
  constructor(
  ) { 
      super()
  }

  private validatePostalCode(zip_from:string,zip_to:string){
    if(!PostalCodeHelper.validatePostalCode(zip_from)){
      Logger.message.error("Postal code not found")
      throw new HttpCustomException(StatusCodeExceptionText[StatusCodeEnums.INVALID_POSTAL_CODE_FROM] ,StatusCodeEnums.INVALID_POSTAL_CODE_FROM)
  }
    if(!PostalCodeHelper.validatePostalCode(zip_to)){
      Logger.message.error("Postal code not found")
      throw new HttpCustomException(StatusCodeExceptionText[StatusCodeEnums.INVALID_POSTAL_CODE_TO] ,StatusCodeEnums.INVALID_POSTAL_CODE_TO)
    }
  }

  async getListCarriers(data:QuotationControllerRequest){
    this.validatePostalCode(data.zip_from,data.zip_to)
    const url: string = `${process.env.SKY_DROPX_URL}/v1/quotations`;
    const body:QuotationWebServiceRequest=new QuotationWebServiceRequest(data.zip_from,data.zip_to,ParcelEnumsDictionary[data.parcel_tag])
    const headers = { 'Content-Type':'application/json', 'Authorization':`Token token=${process.env.SKY_DROPX_TOKEN}`}
    const config = this.buildAxiosRequestConfig(headers);
    let quotationResponse:QuotationsResponse[]= await this.post<QuotationsResponse[]>(url,body, config);  
    let r:string[]=quotationResponse.filter((q:QuotationsResponse ):boolean =>{
      return ServiceHelper.verifyServiceLevelCourier(data.service_tag,q.service_level_code)
    }).map((q:QuotationsResponse):string =>{
      return q.service_level_name
    } )
    return r
}



}