import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CarEntity } from '../Models/Entities/CarEntity';

export default class CarDao {

    constructor(
        @InjectRepository(CarEntity) private _carEntityRepository: Repository<CarEntity>
    ) { }

    async create(carEntity: CarEntity): Promise<CarEntity> {
        await this._carEntityRepository.insert(carEntity);
        return carEntity;
    }
    
    async getAll(): Promise<CarEntity[]> {
        return await this._carEntityRepository.find();
    }
    
    async get(id?: number, patent?: string): Promise<CarEntity> {
        let query = this._carEntityRepository.createQueryBuilder("carEntity");

        if(id){
            query.andWhere('carEntity.id = :id', { id: id });
        }else{
            query.andWhere('carEntity.patent = :patent', { patent: patent});
        }

        return query.getOne();
    }

    async update(carEntity: CarEntity): Promise<CarEntity> {
        return await this._carEntityRepository.save(carEntity);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this._carEntityRepository.delete(id);
    }
}