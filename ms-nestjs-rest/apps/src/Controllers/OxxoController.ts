import { Controller , Post,  Body, HttpCode, Req,Response} from '@nestjs/common';
import EnumHttpCodes from '../Enums/EnumHttpCodes';
import * as rawbody from 'raw-body';
import ErrorResponse from '../Models/Response/ErrorResponse';
import { ApiTags, ApiHeaders, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@ApiTags('service')
@ApiHeaders([{
  name:'X-Procontacto-Trace-Id',
  description: 'traceId',
}])
@ApiInternalServerErrorResponse({type: ErrorResponse})
@Controller('service')
export class OxxoController {
  constructor() {}

  @Post('/')
  @HttpCode(EnumHttpCodes.CREATED)
  @ApiBadRequestResponse({ type: ErrorResponse })
  async create(@Body() data: any, @Req() req:any, @Response() res:any):Promise<any>{
        // body is ignored by NestJS -> get raw body from request
        const raw = await rawbody(req);
        const text = raw.toString().trim();
        console.log('body:', text);
        res.set('Content-Type', 'text/xml');
        res.send(text);
        return
  }

}
