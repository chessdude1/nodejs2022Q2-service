import { Album } from 'src/Albums/albums.entity';
import { Artist } from 'src/Artists/artists.entity';
import { IFavorites } from 'src/Favorites/favorites.interface';
import { Track } from 'src/Tracks/tracks.entity';
import { User } from 'src/user/user.entity';

export class InMemoryStore {
  public static users: User[] = [];
  public static tracks: Track[] = [];
  public static artists: Artist[] = [];
  public static albums: Album[] = [];
  public static favourites: IFavorites = {
    artists: [],
    tracks: [],
    albums: [],
  };
}
