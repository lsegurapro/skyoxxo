import { ApiProperty } from '@nestjs/swagger';

export default class Page<T> {
    
    @ApiProperty({type: Number, description: 'limite de rows'})
    limit: number
    @ApiProperty({type: Number})
    offset: number
    @ApiProperty({type: Number})
    quantity: number
    result: T[]

    public constructor(limit: number, results:T[], offset: number) {
        this.result = results;
        this.limit = limit;
        this.offset = offset;
        this.quantity = results.length;
    }

    public static create<T>(limit: number, results:T[], offset: number): Page<T> {
        return new Page<T>(limit, results, offset);
    }
}