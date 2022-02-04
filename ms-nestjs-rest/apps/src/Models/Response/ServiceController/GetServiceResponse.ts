import { ServiceEntity } from '../../Entities/ServiceEntity';
import { ApiProperty } from '@nestjs/swagger';

export default class GetServiceResponse {
    
    @ApiProperty({type: Number, description: 'ID de la entidad Service', example:1})
    id: number;
    @ApiProperty({type: Boolean, description: 'Nombre de un servicio', example:'100'})
    name: string;
    @ApiProperty({type: Boolean, description: 'Precio que determina el costo de un servicio', example:100})
    price: number;
    @ApiProperty({type: Boolean, description: 'Campo para determinar si el registro esta activado o desactivado', example:true})
    isActive: boolean;

    constructor(serviceEntity: ServiceEntity) {
        this.id = serviceEntity.id;
        this.name = serviceEntity.name;
        this.price = serviceEntity.price;
        this.isActive = serviceEntity.enabled;
    }

    public static create(serviceEntity: ServiceEntity): GetServiceResponse {
        return new GetServiceResponse(serviceEntity);
    }
}