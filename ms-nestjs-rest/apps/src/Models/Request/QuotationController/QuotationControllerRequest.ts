import EnumModelMessages from "apps/src/Enums/EnumModelMessages";
import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { ServiceEnum } from "apps/src/Enums/ServiceEnum";
import { ParcelEnum } from "apps/src/Enums/ParcelEnum";



export default class QuotationControllerRequest {

  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString({ message: EnumModelMessages.IS_STRING })
  @ApiProperty({type: String, description: 'Postal code origin', example:'12345'})
  zip_from: string;

  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString({ message: EnumModelMessages.IS_STRING })
  @ApiProperty({type: String, description: 'Postal code destination', example:'12345'})
  zip_to: string;

  @IsNotEmpty()
  @IsString({ message: EnumModelMessages.IS_STRING })
  @IsIn([ParcelEnum.SMALL,ParcelEnum.MEDIUM,ParcelEnum.LARGE])
  @ApiProperty({type: String, description: 'Parcel tag. Values:["S","M","L"]', example:'S'})
  parcel_tag: ParcelEnum
  
  @IsNotEmpty()
  @IsString({ message: EnumModelMessages.IS_STRING })
  @IsIn([ServiceEnum.STANDARD,ServiceEnum.EXPRESS])
  @ApiProperty({type: String, description: 'Service tag. Values:["STD","EXP"]', example:'STD'})
  service_tag: ServiceEnum
  

}
