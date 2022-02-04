import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { TransactionEntity } from '../Models/Entities/TransactionEntity';
import { ServiceEntity } from '../Models/Entities/ServiceEntity';
import { RelTransactionServiceEntity } from '../Models/Entities/RelTransactionServiceEntity';
import { Logger } from '../Config/LoggerConfig';
import { BadRequestException } from '@nestjs/common';

export default class TransactionDao {

    constructor(
        @InjectRepository(TransactionEntity) private _transactionEntityRepository: Repository<TransactionEntity>,
        @InjectRepository(RelTransactionServiceEntity) private _relTransactionServiceEntityRepository: Repository<RelTransactionServiceEntity>,
    ) { }

    //TODO: este metodo tiene que ser transaccionable, generar un rollback si no funciona
    async create(transactionEntity: TransactionEntity, services: ServiceEntity[]): Promise<TransactionEntity> {
        let res = await this._transactionEntityRepository.insert(transactionEntity);
        for(const service of services){
            let relTrxService:RelTransactionServiceEntity = new RelTransactionServiceEntity();
            relTrxService.serviceId = service.id;
            relTrxService.price = service.price;
            relTrxService.transactionId = res.raw.insertId;
            Logger.message.info(JSON.stringify(res.raw));
            await this._relTransactionServiceEntityRepository.insert(relTrxService);
        }
        return await this.get(res.raw.insertId);
    }
    
    async getAll(): Promise<TransactionEntity[]> {
        let res = await this._transactionEntityRepository.find({ relations: ["relTransactionServiceEntities"] });
        Logger.message.info(JSON.stringify(res));
        return res; 
    }
    
    async get(id?: number): Promise<TransactionEntity> {
        let query = this._transactionEntityRepository.createQueryBuilder("transactionEntity");
    
        if(id){
            query.innerJoinAndSelect('transactionEntity.relTransactionServiceEntities','relTransactionServiceEntities')
            query.andWhere('transactionEntity.id = :id', { id: id });
        }else{
            throw new BadRequestException(new Error("El recurso id es obligatorio"),"El recurso id es obligatorio")
        }
        
        let response = await query.getOne(); 
        return response;
    }

    async getByPersonId(id?: number): Promise<Array<TransactionEntity>> {
        let query = this._transactionEntityRepository.createQueryBuilder("transactionEntity");
        if(id){
            query.innerJoinAndSelect('transactionEntity.relTransactionServiceEntities','relTransactionServiceEntities')
            query.andWhere('transactionEntity.personId = :id', { id: id });
        }else{
            throw new BadRequestException(new Error("El recurso id es obligatorio"),"El recurso id es obligatorio");
        }
        let response = await query.getMany(); 
        Logger.message.info(JSON.stringify(response))
        return response;
    }

    async update(transactionEntity: TransactionEntity): Promise<TransactionEntity> {
        return await this._transactionEntityRepository.save(transactionEntity);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this._transactionEntityRepository.delete(id);
    }
}