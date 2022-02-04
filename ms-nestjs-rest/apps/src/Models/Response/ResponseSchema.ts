import { Type, applyDecorators } from '@nestjs/common';
import { getSchemaPath, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import Response from './Response';

interface IApiResponse<TModel extends Type<any>> {
    type: TModel,
    isArray?: boolean,
    description?: string
}


export const ApiResponse = <TModel extends Type<any>>(
    options:IApiResponse<TModel>
  ) => {
    return applyDecorators(
      ApiOkResponse({
        description: options.description,
        schema: {
          title: `ResponseOf${options.type.name}`,
          allOf: [
            { $ref: getSchemaPath(Response) },
            {
              properties: {
                result: {
                   $ref: getSchemaPath(options.type),
                },
              },
            },
          ],
        },
      }),
    );
  };

  export const ApiResponseCreated = <TModel extends Type<any>>(
    options:IApiResponse<TModel>
  ) => {
    return applyDecorators(
      ApiCreatedResponse({
        description: options.description,
        schema: {
          title: `ResponseCreatedOf${options.type.name}`,
          allOf: [
            { $ref: getSchemaPath(Response) },
            {
              properties: {
                result: {
                   $ref: getSchemaPath(options.type),
                },
              },
            },
          ],
        },
      }),
    );
  };