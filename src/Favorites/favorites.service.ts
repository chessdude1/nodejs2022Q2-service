import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryStore } from 'src/inMemoryDataBase/dataBase';
import { validate } from 'uuid';
import { IFavorites } from './favorites.interface';

@Injectable()
export class FavoritesService {
  private favorites: IFavorites = InMemoryStore.favourites;

  getAlbums(): IFavorites {
    return this.favorites;
  }
}
