import { Controller, Get, HttpCode, Param} from '@nestjs/common';
import EnumHttpCodes from '../Enums/EnumHttpCodes';
import ErrorResponse from '../Models/Response/ErrorResponse';
import { ApiTags, ApiHeaders, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import Response from '../Helpers/Formatter/Response';
import { ConsignmentNotesCategoriesService } from '../Services/ConsignmentNotesCategoriesService';

@ApiTags('consignment-notes')
@ApiHeaders([{
  name:'X-Procontacto-Trace-Id',
  description: 'traceId',
}])
@ApiInternalServerErrorResponse({type: ErrorResponse})
@Controller('consignment-notes')
export class ConsignmentNotesCategoriesController {
  constructor(private readonly _consignmentNotesCategoriesService:ConsignmentNotesCategoriesService) {}

  @Get('categories')
  @HttpCode(EnumHttpCodes.OK)
  async getCategories(
    ): Promise<any>{
    let response:any= await this._consignmentNotesCategoriesService.getCategories()
    return Response.create<object>(response);
}

@HttpCode(EnumHttpCodes.OK)
@Get('categories/:idCategory/subcategories')
async getSubcategoriesByIdCategory(
    @Param('idCategory') idCategory: number
  ): Promise<any>{
  let response:any= await this._consignmentNotesCategoriesService.getSubCategoriesByCategoryId(idCategory)
  return Response.create<object>(response);
}

@HttpCode(EnumHttpCodes.OK)
@Get('subcategories/:idSubCategory/classes')
async getClassesByIdSubCateroy(
    @Param('idSubCategory') idSubCategory: number
  ): Promise<any>{
  let response:any= await this._consignmentNotesCategoriesService.getClassesBySubCategoryId(idSubCategory)
  return Response.create<object>(response);
}

}
