import { AlbumDbEntity } from 'src/Albums/entities/albumDb.entity';
import { ArtistDbEntity } from 'src/Artists/entities/artistDbEntity.entity';
import { TrackDbEntity } from 'src/Tracks/entities/trackDb.entity';

import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class FavoritesDbEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArtistDbEntity, { cascade: true })
  @JoinTable()
  artists: ArtistDbEntity[];

  @ManyToMany(() => AlbumDbEntity, { cascade: true })
  @JoinTable()
  albums: AlbumDbEntity[];

  @ManyToMany(() => TrackDbEntity, { cascade: true })
  @JoinTable()
  tracks: TrackDbEntity[];
}
