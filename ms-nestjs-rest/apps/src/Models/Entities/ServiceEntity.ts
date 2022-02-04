import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RelTransactionServiceEntity } from "./RelTransactionServiceEntity";

@Index("service_entity_UN", ["name"], { unique: true })
@Entity("service_entity", { schema: "MECHANICAL_SERVICE" })
export class ServiceEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("int", { name: "price" })
  price: number;

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
    () => RelTransactionServiceEntity,
    (relTransactionServiceEntity) => relTransactionServiceEntity.service
  )
  relTransactionServiceEntities: RelTransactionServiceEntity[];
}
