import { Artist } from './artists.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryStore } from 'src/inMemoryDataBase/dataBase';
import { IArtist } from './artists.interface';
import { validate } from 'uuid';

@Injectable()
export class ArtistService {
  private artists: Array<IArtist> = InMemoryStore.artists;

  getArtists(): Array<IArtist> {
    return this.artists;
  }

  getArtist(id: number): IArtist {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedArtist = this.artists.find(
      (artist) => artist.id === String(id),
    );

    if (!findedArtist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return findedArtist;
  }

  createArtist(artistData: CreateArtistDto): IArtist {
    const newArtist = new Artist(artistData.name, artistData.grammy);
    this.artists.push({ ...newArtist });
    return newArtist;
  }

  updateArtist(id: number, artistData: CreateArtistDto): IArtist {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedArtist = this.artists.find(
      (artist) => artist.id === String(id),
    );

    if (!findedArtist) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    const updatedArtist = {
      ...findedArtist,
      ...artistData,
    };

    this.artists.push(updatedArtist);

    return updatedArtist;
  }

  // TODO: should set track.artistId and track.albumId to null after deletion
  deleteArtist(id: number) {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedArtist = this.artists.find(
      (artist) => artist.id === String(id),
    );

    this.artists = this.artists.filter((artist) => artist.id !== String(id));

    if (!findedArtist) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return findedArtist;
  }
}
