import { ApiProperty } from "@nestjs/swagger"
import EnumModelMessages from "apps/src/Enums/EnumModelMessages"
import { ParcelEnum } from "apps/src/Enums/ParcelEnum";
import { ServiceEnum } from "apps/src/Enums/ServiceEnum";
import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsString, ValidateNested } from "class-validator"

class Address{
    @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
    @IsString({ message: EnumModelMessages.IS_STRING })
    @ApiProperty({type: String, description: 'Province name', example:'Ciudad de México'})    
    province:string;
    
    @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
    @IsString({ message: EnumModelMessages.IS_STRING })
    @ApiProperty({type: String, description: 'city name', example:'Azcapotzalco'})    
    city:string;

    @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
    @IsString({ message: EnumModelMessages.IS_STRING })
    @ApiProperty({type: String, description: 'customer name', example:'Jose Fernando'})    
    name:string;

    @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
    @IsString({ message: EnumModelMessages.IS_STRING })
    @ApiProperty({type: String, description: 'zip', example:'02900'})    
    zip:string;

    @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
    @IsString({ message: EnumModelMessages.IS_STRING })
    @ApiProperty({type: String, description: 'country', example:'MX'})    
    country:string;

    @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
    @IsString({ message: EnumModelMessages.IS_STRING })
    @ApiProperty({type: String, description: 'Address 1', example:'Av. Principal #234'})  
    address1:string

    @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
    @IsString({ message: EnumModelMessages.IS_STRING })
    @ApiProperty({type: String, description: 'Address 2', example:'Av. Principal #234'})  
    address2:string

    @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
    @IsString({ message: EnumModelMessages.IS_STRING })
    @ApiProperty({type: String, description: 'company', example:'skydropx'})  
    company:string

    @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
    @IsString({ message: EnumModelMessages.IS_STRING })
    @ApiProperty({type: String, description: 'phone', example:'5555555555'}) 
    phone:string

    @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
    @IsString({ message: EnumModelMessages.IS_STRING })
    @ApiProperty({type: String, description: 'email', example:'skydropx@email.com'}) 
    email:string
}


export default class ShipmentRequestController{
    @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
    @IsString({ message: EnumModelMessages.IS_STRING })
    @ApiProperty({type: String, description: 'Consigment note class code', example:'12345'})    
    consignment_note_class_code:string

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Address)
    address_from:Address

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Address)
    address_to:Address

    @IsNotEmpty()
    @IsString({ message: EnumModelMessages.IS_STRING })
    consignment_note_subcategory_code:string

    @IsNotEmpty()
    @IsString({ message: EnumModelMessages.IS_STRING })
    @IsIn([ServiceEnum.STANDARD,ServiceEnum.EXPRESS])
    service_tag:ServiceEnum

    @IsNotEmpty()
    @IsString({ message: EnumModelMessages.IS_STRING })
    @IsIn([ParcelEnum.SMALL,ParcelEnum.MEDIUM,ParcelEnum.LARGE])
    @ApiProperty({type: String, description: 'Parcel tag. Values:["S","M","L"]', example:'S'})
    parcel_tag: ParcelEnum

}