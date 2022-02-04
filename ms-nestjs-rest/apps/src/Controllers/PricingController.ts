import {  Controller, Get, HttpCode} from '@nestjs/common';
import EnumHttpCodes from '../Enums/EnumHttpCodes';
import ErrorResponse from '../Models/Response/ErrorResponse';
import { ApiTags, ApiHeaders, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import Response from '../Helpers/Formatter/Response';
import { PricingServiceRequestController } from '../Models/Response/PricingController/PricingServiceController';
import { PricingOxxoController } from '../Models/Response/PricingController/OxxoPricingController';

@ApiTags('pricings')
@ApiHeaders([{
  name:'X-Procontacto-Trace-Id',
  description: 'traceId',
}])
@ApiInternalServerErrorResponse({type: ErrorResponse})
@Controller('pricings')
export class PricingServiceController {
  constructor() {}

    @Get('/services')
    @HttpCode(EnumHttpCodes.OK)
        async getCityAndStateByPostalCode(): Promise<Response<PricingServiceRequestController>>{
        return Response.create<PricingServiceRequestController>(PricingServiceRequestController.getInstance());
    }

    @Get('/oxxo')
    @HttpCode(EnumHttpCodes.OK)
        async getOxxoPricing(): Promise<Response<PricingOxxoController>>{
        return Response.create<PricingOxxoController>(PricingOxxoController.getInstance());
    }
}