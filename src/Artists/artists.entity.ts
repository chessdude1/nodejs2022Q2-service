import { v4 as uuidv4 } from 'uuid';
import { IArtist } from './artists.interface';

export class Artist implements IArtist {
  constructor(name: string, grammy: boolean) {
    this.name = name;
    this.grammy = grammy;
  }

  id = uuidv4();
  name: string;
  grammy: boolean;
}
