import { Artist } from './artists.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryStore } from 'src/inMemoryDataBase/dataBase';
import { IArtist } from './artists.interface';
import { validate } from 'uuid';

@Injectable()
export class ArtistService {
  getArtists(): Array<IArtist> {
    return InMemoryStore.artists;
  }

  getArtist(id: number): IArtist {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedArtist = InMemoryStore.artists.find(
      (artist) => artist.id === String(id),
    );

    if (!findedArtist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return findedArtist;
  }

  createArtist(artistData: CreateArtistDto): IArtist {
    const newArtist = new Artist(artistData.name, artistData.grammy);
    InMemoryStore.artists.push({ ...newArtist });
    return newArtist;
  }

  updateArtist(id: number, artistData: CreateArtistDto): IArtist {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedArtist = InMemoryStore.artists.find(
      (artist) => artist.id === String(id),
    );

    if (!findedArtist) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    const updatedArtist = {
      ...findedArtist,
      ...artistData,
    };

    InMemoryStore.artists.push(updatedArtist);

    return updatedArtist;
  }

  // TODO: should set track.artistId and track.albumId to null after deletion
  deleteArtist(id: number) {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedArtist = InMemoryStore.artists.find(
      (artist) => artist.id === String(id),
    );

    InMemoryStore.artists = InMemoryStore.artists.filter(
      (artist) => artist.id !== String(id),
    );

    InMemoryStore.albums = InMemoryStore.albums.map((album) => {
      if (album.artistId === String(id)) {
        return { ...album, artistId: null };
      }
      return album;
    });

    InMemoryStore.favourites.artists = InMemoryStore.favourites.artists.filter(
      (artist) => artist.id !== String(id),
    );

    InMemoryStore.tracks = InMemoryStore.tracks.map((track) => {
      if (track.artistId === String(id)) {
        return { ...track, artistId: null };
      }
      return track;
    });

    if (!findedArtist) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return findedArtist;
  }
}
