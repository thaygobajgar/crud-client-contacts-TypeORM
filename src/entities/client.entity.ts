import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Timestamp,
} from "typeorm";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  firtsName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 127, unique: true })
  email: string;

  @Column({ length: 127 })
  password: string;

  @Column({ length: 14 })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export { Client };
