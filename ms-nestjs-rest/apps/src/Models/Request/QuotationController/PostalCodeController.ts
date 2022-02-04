import EnumModelMessages from "apps/src/Enums/EnumModelMessages";
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export default class PostalCodeController {

  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString({ message: EnumModelMessages.IS_STRING })
  @ApiProperty({type: String, description: 'Postal code origin', example:'12345'})
  zip_from: string;

  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString({ message: EnumModelMessages.IS_STRING })
  @ApiProperty({type: String, description: 'Postal code destination', example:'12345'})
  zip_to: string;

}
