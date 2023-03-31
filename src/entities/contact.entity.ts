import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { Client } from "./client.entity";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  lastName?: string | undefined | null;

  @Column({ length: 127 })
  email: string;

  @Column({ length: 14 })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Client, { cascade: true })
  client: Client;
}
export { Contact };
