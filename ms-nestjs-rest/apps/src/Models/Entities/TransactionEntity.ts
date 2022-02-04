import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RelTransactionServiceEntity } from "./RelTransactionServiceEntity";
import { CarEntity } from "./CarEntity";
import { PersonEntity } from "./PersonEntity";

@Index("FK_PERSON_ID_TRANSACTION_ENTITY_PERSON_ID", ["personId"], {})
@Index("FK_CAR_ID_TRANSACTION_ENTITY_CAR_ID", ["carId"], {})
@Entity("transaction_entity", { schema: "MECHANICAL_SERVICE" })
export class TransactionEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "car_id" })
  carId: number;

  @Column("int", { name: "person_id" })
  personId: number;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

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
    (relTransactionServiceEntity) => relTransactionServiceEntity.transaction
  )
  relTransactionServiceEntities: RelTransactionServiceEntity[];

  @ManyToOne(() => CarEntity, (carEntity) => carEntity.transactionEntities, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "car_id", referencedColumnName: "id" }])
  car: CarEntity;

  @ManyToOne(
    () => PersonEntity,
    (personEntity) => personEntity.transactionEntities,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "person_id", referencedColumnName: "id" }])
  person: PersonEntity;
}
