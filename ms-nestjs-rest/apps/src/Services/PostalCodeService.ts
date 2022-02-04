import { Injectable } from '@nestjs/common';
import GetPostalCodeController from '../Models/Response/PostalCodeController/GetPostalCodeController';
import PostalCodeHelper from '../Helpers/SkyDropx/PostalCodeHelper';
import HttpCustomException from '../Exceptions/HttpCustomException';
import { StatusCodeEnums, StatusCodeExceptionText } from '../Enums/StatusCodeEnums';
import { Logger } from '../Config/LoggerConfig';


@Injectable()
export class PostalCodeService{
  constructor(
    
  ) { 

  }

  async getCityAndStateByPostalCode(postalCode: string): Promise<GetPostalCodeController> {
    if(!PostalCodeHelper.validatePostalCode(postalCode)){
        Logger.message.error("Postal code not found")
        throw new HttpCustomException(StatusCodeExceptionText[StatusCodeEnums.INVALID_POSTAL_CODE] ,StatusCodeEnums.INVALID_POSTAL_CODE)
    }
    console.log(PostalCodeHelper.getCityAndState(postalCode))
    return new GetPostalCodeController(PostalCodeHelper.getCityAndState(postalCode))
  }
  

}