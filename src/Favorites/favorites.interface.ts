import { IArtist } from 'src/Artists/artists.interface';
import { IAlbum } from 'src/Albums/albums.interface';
import { ITrack } from 'src/Tracks/tracks.interface';

export interface IFavorites {
  artists: IArtist[];
  tracks: ITrack[];
  albums: IAlbum[];
}
