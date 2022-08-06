import { Artist } from 'src/Artists/artists.entity';
import { ArtistDbEntity } from 'src/Artists/entities/artistDbEntity.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('albums')
export class AlbumDbEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({
    nullable: true,
    type: 'uuid',
  })
  artistId: string | null;

  toResponse = () => {
    return {
      ...this,
    };
  };
}
