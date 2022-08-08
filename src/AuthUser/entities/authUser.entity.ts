import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('authUser')
export class AuthUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
