import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAlbum } from 'src/Albums/albums.interface';
import { IArtist } from 'src/Artists/artists.interface';
import { InMemoryStore } from 'src/inMemoryDataBase/dataBase';
import { ITrack } from 'src/Tracks/tracks.interface';
import { validate } from 'uuid';
import { IFavorites } from './favorites.interface';

@Injectable()
export class FavoritesService {
  private favorites: IFavorites = InMemoryStore.favourites;

  getFavorites(): IFavorites {
    return this.favorites;
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

    this.favorites.tracks.push(findedTrackToAddInFavorites);
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

    this.favorites.albums.push(findedAlbumToAddInFavorites);

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

    this.favorites.artists.push(findedArtistToAddInFavorites);

    return findedArtistToAddInFavorites;
  }

  deleteTrackFromFavorites(id: number): ITrack {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedTrack = this.favorites.tracks.find(
      (track) => track.id === String(id),
    );

    if (!findedTrack) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    this.favorites.tracks = this.favorites.tracks.filter(
      (track) => track.id !== String(id),
    );

    return findedTrack;
  }

  deleteAlbumFromFavorites(id: number): IAlbum {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }
    const findedAlbum = this.favorites.albums.find(
      (album) => album.id === String(id),
    );

    if (!findedAlbum) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    this.favorites.albums = this.favorites.albums.filter(
      (album) => album.id !== String(id),
    );

    return findedAlbum;
  }

  deleteArtistFromFavorites(id: number): IArtist {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedArtist = this.favorites.artists.find(
      (artist) => artist.id === String(id),
    );

    if (!findedArtist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    this.favorites.artists = this.favorites.artists.filter(
      (artist) => artist.id !== String(id),
    );

    return findedArtist;
  }
}
