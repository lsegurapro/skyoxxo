import { PersonEntity } from '../../Entities/PersonEntity';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionEntity } from '../../Entities/TransactionEntity';
import GetTransactionResponse from '../TransactionController/GetTransactionResponse';


export default class GetTransactionByPersonIdResponse {
    
    @ApiProperty({type: Number, description: 'ID de la entidad Person', example:1})
    id: number;
    @ApiProperty({type: GetTransactionResponse, description: 'Array of Transactions', example:[GetTransactionResponse.create(new TransactionEntity())], isArray:true})
    transactions: Array<GetTransactionResponse>

    constructor(personEntity: PersonEntity, transactionEntities: Array<TransactionEntity>) {
        this.id = personEntity.id;
        this.transactions = transactionEntities.map(GetTransactionResponse.create);
    }

    public static create(personEntity: PersonEntity, transactionEntities: Array<TransactionEntity>): GetTransactionByPersonIdResponse {
        return new GetTransactionByPersonIdResponse(personEntity, transactionEntities);
    }
}