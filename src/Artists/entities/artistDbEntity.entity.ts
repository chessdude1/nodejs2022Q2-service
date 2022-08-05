import { Album } from 'src/Albums/albums.entity';
import { AlbumDbEntity } from 'src/Albums/entities/albumDb.entity';
import { Track } from 'src/Tracks/tracks.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artists')
export class ArtistDbEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumDbEntity, (album) => album.artist, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  albums: Album[];

  @OneToMany(() => AlbumDbEntity, (track) => track.artist, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  tracks: Track[];

  toResponse = () => {
    return {
      ...this,
    };
  };
}
