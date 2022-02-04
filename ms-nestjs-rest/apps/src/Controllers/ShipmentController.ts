import { Body, Controller, HttpCode, Post} from '@nestjs/common';
import EnumHttpCodes from '../Enums/EnumHttpCodes';
import ErrorResponse from '../Models/Response/ErrorResponse';
import { ApiTags, ApiHeaders, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import Response from '../Helpers/Formatter/Response';
import ShipmentRequestController from '../Models/Request/shipment/ShipmentRequestController';
import { ShipmentService } from '../Services/ShipmentService';

@ApiTags('shipments')
@ApiHeaders([{
  name:'X-Procontacto-Trace-Id',
  description: 'traceId',
}])
@ApiInternalServerErrorResponse({type: ErrorResponse})
@Controller('shipments')
export class ShipmentController {
  constructor(private readonly _shipmentService:ShipmentService) {}

  @Post('/')
  @HttpCode(EnumHttpCodes.OK)
  async createQuotations(
      @Body() data: ShipmentRequestController,
  ): Promise<Response<ShipmentRequestController>>{
      await this._shipmentService.createShipmentAndLabel(data)
      return Response.create<ShipmentRequestController>(data);
  }
}
