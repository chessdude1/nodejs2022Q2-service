import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserDbEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  toResponse() {
    const { id, login } = this;
    return { id, login };
  }
}
