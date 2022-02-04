import { ApiProperty } from '@nestjs/swagger';

class ErrorValidatePostalCode {
    
    @ApiProperty({type: Number, description: 'Error code from field zip_from', example:"Is null"})
    zip_from: any;
    @ApiProperty({type: Number, description: 'Error code from field zip_from', example:"Is null"})
    zip_to: any;

    constructor(zip_from:any,zip_to:any) {
        this.zip_from = zip_from==undefined?null:zip_from;
        this.zip_to = zip_to==undefined?null:zip_to;
    }
}

export default class ValidatePostalCodeWebServiceResponse {
    
    errors: ErrorValidatePostalCode;

    constructor(zip_from:any,zip_to:any) {
        this.errors= new ErrorValidatePostalCode(zip_from,zip_to)
    }
}