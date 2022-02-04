import { Body, Controller, HttpCode, Post} from '@nestjs/common';
import EnumHttpCodes from '../Enums/EnumHttpCodes';
import ErrorResponse from '../Models/Response/ErrorResponse';
import { ApiTags, ApiHeaders, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import Response from '../Helpers/Formatter/Response';
import { QuotationService } from '../Services/QuotationService';
import QuotationControllerRequest from '../Models/Request/QuotationController/QuotationControllerRequest';

@ApiTags('quotations')
@ApiHeaders([{
  name:'X-Procontacto-Trace-Id',
  description: 'traceId',
}])
@ApiInternalServerErrorResponse({type: ErrorResponse})
@Controller('quotations')
export class QuotationController {
  constructor(private readonly _quotationService:QuotationService) {}

    @Post('/')
    @HttpCode(EnumHttpCodes.OK)
    async createQuotations(
        @Body() data: QuotationControllerRequest,
    ): Promise<Response<any>>{
        let r=await this._quotationService.getListCarriers(data)
        return Response.create<any>(r);
    }

}
