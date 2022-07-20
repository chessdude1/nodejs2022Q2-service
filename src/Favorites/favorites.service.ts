import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAlbum } from 'src/Albums/albums.interface';
import { IArtist } from 'src/Artists/artists.interface';
import { InMemoryStore } from 'src/inMemoryDataBase/dataBase';
import { ITrack } from 'src/Tracks/tracks.interface';
import { validate } from 'uuid';
import { IFavorites } from './favorites.interface';

@Injectable()
export class FavoritesService {
  getFavorites(): IFavorites {
    return InMemoryStore.favourites;
  }

  addTrackToFavorites(id: number): ITrack {
    const store = { ...InMemoryStore };

    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedTrackToAddInFavorites = store.tracks.find(
      (track) => track.id === String(id),
    );

    if (!findedTrackToAddInFavorites) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    InMemoryStore.favourites.tracks.push(findedTrackToAddInFavorites);
    return findedTrackToAddInFavorites;
  }

  addAlbumToFavorites(id: number): IAlbum {
    const store = { ...InMemoryStore };

    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedAlbumToAddInFavorites = store.albums.find(
      (album) => album.id === String(id),
    );

    if (!findedAlbumToAddInFavorites) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    InMemoryStore.favourites.albums.push(findedAlbumToAddInFavorites);

    return findedAlbumToAddInFavorites;
  }

  addArtistToFavorites(id: number): IArtist {
    const store = { ...InMemoryStore };

    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedArtistToAddInFavorites = store.artists.find(
      (artist) => artist.id === String(id),
    );

    if (!findedArtistToAddInFavorites) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    InMemoryStore.favourites.artists.push(findedArtistToAddInFavorites);

    return findedArtistToAddInFavorites;
  }

  deleteTrackFromFavorites(id: number): ITrack {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedTrack = InMemoryStore.favourites.tracks.find(
      (track) => track.id === String(id),
    );

    if (!findedTrack) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    InMemoryStore.favourites.tracks = InMemoryStore.favourites.tracks.filter(
      (track) => track.id !== String(id),
    );

    return findedTrack;
  }

  deleteAlbumFromFavorites(id: number): IAlbum {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }
    const findedAlbum = InMemoryStore.favourites.albums.find(
      (album) => album.id === String(id),
    );

    if (!findedAlbum) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    InMemoryStore.favourites.albums = InMemoryStore.favourites.albums.filter(
      (album) => album.id !== String(id),
    );

    return findedAlbum;
  }

  deleteArtistFromFavorites(id: number): IArtist {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedArtist = InMemoryStore.favourites.artists.find(
      (artist) => artist.id === String(id),
    );

    if (!findedArtist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    InMemoryStore.favourites.artists = InMemoryStore.favourites.artists.filter(
      (artist) => artist.id !== String(id),
    );

    return findedArtist;
  }
}
