import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ServiceEntity } from '../Models/Entities/ServiceEntity';

export default class ServiceDao {

    constructor(
        @InjectRepository(ServiceEntity) private _serviceEntityRepository: Repository<ServiceEntity>
    ) { }

    async create(ServiceEntity: ServiceEntity): Promise<ServiceEntity> {
        await this._serviceEntityRepository.insert(ServiceEntity);
        return ServiceEntity;
    }
    
    async getAll(): Promise<ServiceEntity[]> {
        return await this._serviceEntityRepository.find();
    }
    
    async get(id?: number, name?: string): Promise<ServiceEntity> {
        let query = this._serviceEntityRepository.createQueryBuilder("ServiceEntity");

        if(id){
            query.andWhere('ServiceEntity.id = :id', { id: id });
        }else{
            query.andWhere('ServiceEntity.name = :name', { name: name});
        }

        return query.getOne();
    }

    async update(ServiceEntity: ServiceEntity): Promise<ServiceEntity> {
        return await this._serviceEntityRepository.save(ServiceEntity);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this._serviceEntityRepository.delete(id);
    }
}