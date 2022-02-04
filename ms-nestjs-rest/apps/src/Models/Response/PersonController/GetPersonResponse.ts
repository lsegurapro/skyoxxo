import { PersonEntity } from '../../Entities/PersonEntity';
import { ApiProperty } from '@nestjs/swagger';


export default class GetPersonResponse {
    
    @ApiProperty({type: Number, description: 'ID de la entidad Person', example:1})
    id: number;
    @ApiProperty({type: String, description: 'Nombre del propietario del auto', example:'Julian'})
    name: string;
    @ApiProperty({type: String, description: 'Apellido del propietario del auto', example:'Avaca'})
    lastName: string;
    @ApiProperty({type: String, description: 'Email del propietario del auto', example:'hola@procontacto.net'})
    email: string;
    @ApiProperty({type: String, description: 'Telefono del propietario del auto', example:'1169360822'})
    phone: string;
    @ApiProperty({type: String, description: 'Identificador del propietario del auto (dni para Arg)', example:'34920431'})
    pid: string;
    @ApiProperty({type: Boolean, description: 'Campo para determinar si el registro esta activado o desactivado', example:true})
    isActive: boolean;

    constructor(personEntity: PersonEntity) {
        this.id = personEntity.id;
        this.name = personEntity.name;
        this.lastName = personEntity.lastName;
        this.email = personEntity.email;
        this.phone = personEntity.phone;
        this.pid = personEntity.pid;
        this.isActive = personEntity.enabled;
    }

    public static create(personEntity: PersonEntity): GetPersonResponse {
        return new GetPersonResponse(personEntity);
    }
}