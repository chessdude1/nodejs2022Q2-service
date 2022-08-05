import { v4 as uuidv4 } from 'uuid';
import { IAlbum } from './albums.interface';

export class Album implements IAlbum {
  constructor(name: string, year: number, artistId: string | null) {
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  id = uuidv4();
  artistId: string;
  name: string;
  year: number;

  toResponse = () => {
    return {
      ...this,
    };
  };
}
