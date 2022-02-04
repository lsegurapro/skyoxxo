import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TransactionEntity } from "./TransactionEntity";
import { CarEntity } from "./CarEntity";

@Index("person_entity_UN", ["email"], { unique: true })
@Entity("person_entity", { schema: "MECHANICAL_SERVICE" })
export class PersonEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "last_name", length: 255 })
  lastName: string;

  @Column("varchar", { name: "phone", length: 255 })
  phone: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "pid", length: 255 })
  pid: string;

  @Column("tinyint", {
    name: "enabled",
    comment:
      "Atributo booleano que indicará si la entidad está o no habilitada",
    width: 1,
    default: () => "'1'",
  })
  enabled: boolean;

  @Column("timestamp", {
    name: "created_at",
    comment: "Fecha de creación de la entidad",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    nullable: true,
    comment: "Fecha de actualización de la entidad",
  })
  updatedAt: Date | null;

  @Column("timestamp", {
    name: "deleted_at",
    nullable: true,
    comment: "Fecha de baja lógica de la entidad",
  })
  deletedAt: Date | null;

  @OneToMany(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.person
  )
  transactionEntities: TransactionEntity[];

  @OneToMany(() => CarEntity, (carEntity) => carEntity.person)
  carEntities: CarEntity[];
}
