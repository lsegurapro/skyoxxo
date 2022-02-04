import {  Controller, Get, HttpCode, Param} from '@nestjs/common';
import EnumHttpCodes from '../Enums/EnumHttpCodes';
import ErrorResponse from '../Models/Response/ErrorResponse';
import { ApiTags, ApiHeaders, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import Response from '../Helpers/Formatter/Response';
import { PostalCodeService } from '../Services/PostalCodeService';
import GetPostalCodeController from '../Models/Response/PostalCodeController/GetPostalCodeController';

@ApiTags('postal-codes')
@ApiHeaders([{
  name:'X-Procontacto-Trace-Id',
  description: 'traceId',
}])
@ApiInternalServerErrorResponse({type: ErrorResponse})
@Controller('postal-codes')
export class PostalCodeController {
  constructor(private readonly _quotationService:PostalCodeService) {}

  
  @Get('/:postalCode/city')
  @HttpCode(EnumHttpCodes.OK)
  async getCityAndStateByPostalCode(
    @Param('postalCode') postalCode: string
): Promise<Response<GetPostalCodeController>>{
    let response:GetPostalCodeController= await this._quotationService.getCityAndStateByPostalCode(postalCode)
    return Response.create<GetPostalCodeController>(response);
}

}