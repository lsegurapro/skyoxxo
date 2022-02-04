import { Injectable } from '@nestjs/common';
import { AxiosService } from './AxiosService';

@Injectable()
export class ConsignmentNotesCategoriesService extends AxiosService{
  constructor(
    
  ) { 
      super()
  }

 
  async getCategories(): Promise<any> {
    const url: string = `${process.env.SKY_DROPX_URL}/v1/consignment_notes/categories`;
    const headers = { 'Content-Type':'application/json', 'Authorization':`Token token=${process.env.SKY_DROPX_TOKEN}`}
    const config = this.buildAxiosRequestConfig(headers);
    return await this.get<any>(url, config);
  }

  async getSubCategoriesByCategoryId(idCategory:number): Promise<any> {
    const url: string = `${process.env.SKY_DROPX_URL}/v1/consignment_notes/categories/${idCategory}/subcategories`;
    const headers = { 'Content-Type':'application/json', 'Authorization':`Token token=${process.env.SKY_DROPX_TOKEN}`}
    const config = this.buildAxiosRequestConfig(headers);
    return await this.get<any>(url, config);
  }

  async getClassesBySubCategoryId(idSubCategory:number): Promise<any> {
    const url: string = `${process.env.SKY_DROPX_URL}/v1/consignment_notes/subcategories/${idSubCategory}/classes`;
    const headers = { 'Content-Type':'application/json', 'Authorization':`Token token=${process.env.SKY_DROPX_TOKEN}`}
    const config = this.buildAxiosRequestConfig(headers);
    return await this.get<any>(url, config);
  }

}