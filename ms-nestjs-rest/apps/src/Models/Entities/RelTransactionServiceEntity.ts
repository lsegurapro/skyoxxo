import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ServiceEntity } from "./ServiceEntity";
import { TransactionEntity } from "./TransactionEntity";

@Index(
  "FK_TRANSACTION_ID_REL_TRANSACTION_SERVICE_ENTITY_TRANSACTION_ID",
  ["transactionId"],
  {}
)
@Index(
  "FK_SERVICE_ID_REL_TRANSACTION_SERVICE_ENTITY_SERVICE_ID",
  ["serviceId"],
  {}
)
@Entity("rel_transaction_service_entity", { schema: "MECHANICAL_SERVICE" })
export class RelTransactionServiceEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "transaction_id" })
  transactionId: number;

  @Column("int", { name: "service_id" })
  serviceId: number;

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

  @ManyToOne(
    () => ServiceEntity,
    (serviceEntity) => serviceEntity.relTransactionServiceEntities,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "service_id", referencedColumnName: "id" }])
  service: ServiceEntity;

  @ManyToOne(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.relTransactionServiceEntities,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "transaction_id", referencedColumnName: "id" }])
  transaction: TransactionEntity;
}
