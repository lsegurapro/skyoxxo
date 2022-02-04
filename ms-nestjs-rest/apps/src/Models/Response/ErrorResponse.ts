import { ApiProperty } from '@nestjs/swagger';

export default class ErrorResponse {
    @ApiProperty({type: Number})
    statusCode: number;
    @ApiProperty({type: String})
    message: string;
    @ApiProperty({type: String})
    error: string;

    public constructor(statusCode: number, message: string, error: string) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }

    public static create(statusCode: number, message: string, error: string): ErrorResponse {
        return new ErrorResponse(statusCode, message, error);
    }
}