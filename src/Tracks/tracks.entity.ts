import { ITrack } from './tracks.interface';
import { v4 as uuidv4 } from 'uuid';

export class Track implements ITrack {
  constructor(
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number,
  ) {
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }

  id = uuidv4();
  name: string;
  artistId: string;
  albumId: string;
  duration: number;
  version = 1;
}
