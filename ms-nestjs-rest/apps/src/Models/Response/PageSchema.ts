import { Type, applyDecorators } from '@nestjs/common';
import { getSchemaPath, ApiOkResponse } from '@nestjs/swagger';
import Page from './Page';

interface IApiPAgeResponse<TModel extends Type<any>> {
    type: TModel,
    isArray?: boolean,
    description?: string
}


export const ApiPageResponse = <TModel extends Type<any>>(
    options:IApiPAgeResponse<TModel>
  ) => {
    return applyDecorators(
      ApiOkResponse({
        description: options.description,
        schema: {
          title: `PageResponseOf${options.type.name}`,
          allOf: [
            { $ref: getSchemaPath(Page) },
            {
              properties: {
                result: {
                   type: 'array', 
                   items: { $ref: getSchemaPath(options.type)},
                },
              },
            },
          ],
        },
      }),
    );
  };