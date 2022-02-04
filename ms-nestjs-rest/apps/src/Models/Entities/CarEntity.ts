import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TransactionEntity } from "./TransactionEntity";
import { PersonEntity } from "./PersonEntity";

@Index("car_entity_UN", ["patent"], { unique: true })
@Index("FK_PERSON_ID_CAR_ENTITY_PERSON_ID", ["personId"], {})
@Entity("car_entity", { schema: "MECHANICAL_SERVICE" })
export class CarEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "model", length: 255 })
  model: string;

  @Column("varchar", { name: "brand", length: 255 })
  brand: string;

  @Column("varchar", { name: "patent", unique: true, length: 255 })
  patent: string;

  @Column("varchar", { name: "color", length: 255 })
  color: string;

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

  @Column("int", { name: "person_id" })
  personId: number;

  @OneToMany(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.car
  )
  transactionEntities: TransactionEntity[];

  @ManyToOne(() => PersonEntity, (personEntity) => personEntity.carEntities, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "person_id", referencedColumnName: "id" }])
  person: PersonEntity;
}
