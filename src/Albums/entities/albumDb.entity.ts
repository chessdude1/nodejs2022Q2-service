import { Artist } from 'src/Artists/artists.entity';
import { ArtistDbEntity } from 'src/Artists/entities/artistDbEntity.entity';
import { FavoritesDbEntity } from 'src/Favorites/entities/favoriteDbEntity.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => ArtistDbEntity, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist;

  toResponse = () => {
    return {
      ...this,
    };
  };
}
