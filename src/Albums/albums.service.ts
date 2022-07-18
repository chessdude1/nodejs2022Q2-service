import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryStore } from 'src/inMemoryDataBase/dataBase';

@Injectable()
export class AlbumsService {
  private albums: Array<IAlbum> = InMemoryStore.albums;

  getArtists(): Array<IAlbum> {
    return this.albums;
  }
}
