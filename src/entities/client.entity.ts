import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { Contact } from "./contact.entity";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 127, unique: true })
  email: string;

  @Column({ length: 127 })
  password: string;
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @Column({ length: 14 })
  phone: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAdm: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Contact, (contact) => contact.client)
  contacts: Contact[];
}

export { Client };
