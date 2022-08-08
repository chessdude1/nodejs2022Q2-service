import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tracks')
export class TrackDbEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
    type: 'uuid',
  })
  artistId: string | null;

  @Column({
    nullable: true,
    type: 'uuid',
  })
  albumId: string | null;

  @Column()
  duration: number;

  toResponse = () => {
    return {
      ...this,
    };
  };
}
