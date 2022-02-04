import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { PersonEntity } from '../Models/Entities/PersonEntity';

export default class PersonDao {

    constructor(
        @InjectRepository(PersonEntity) private _personEntityRepository: Repository<PersonEntity>
    ) { }

    async create(PersonEntity: PersonEntity): Promise<PersonEntity> {
        await this._personEntityRepository.insert(PersonEntity);
        return PersonEntity;
    }
    
    async getAll(): Promise<PersonEntity[]> {
        return await this._personEntityRepository.find();
    }
    
    async get(id?: number, email?: string): Promise<PersonEntity> {
        let query = this._personEntityRepository.createQueryBuilder("PersonEntity");

        if(id){
            query.andWhere('PersonEntity.id = :id', { id: id });
        }else{
            query.andWhere('PersonEntity.email = :email', { email: email});
        }

        return query.getOne();
    }

    async update(PersonEntity: PersonEntity): Promise<PersonEntity> {
        return await this._personEntityRepository.save(PersonEntity);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this._personEntityRepository.delete(id);
    }
}