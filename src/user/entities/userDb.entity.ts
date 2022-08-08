import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserDbEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column({ nullable: true })
  refreshToken: string;

  @Column('bigint')
  createdAt: number;

  @Column('bigint')
  updatedAt: number;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return {
      id,
      login,
      version,
      createdAt: Number(createdAt),
      updatedAt: Number(updatedAt),
    };
  }
}
