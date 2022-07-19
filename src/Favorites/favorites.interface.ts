import { Album } from 'src/Albums/albums.entity';
import { Artist } from 'src/Artists/artists.entity';
import { Track } from 'src/Tracks/tracks.entity';

export interface IFavorites {
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
}
