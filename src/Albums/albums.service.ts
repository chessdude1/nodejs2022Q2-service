import { UpdateAlbumDto } from './dto/update-album.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryStore } from 'src/inMemoryDataBase/dataBase';
import { Album } from './albums.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { validate } from 'uuid';
import { IAlbum } from './albums.interface';

@Injectable()
export class AlbumsService {
  getAlbums(): Array<IAlbum> {
    return InMemoryStore.albums;
  }

  getAlbum(id: number): IAlbum {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedAlbum = InMemoryStore.albums.find(
      (album) => album.id === String(id),
    );

    if (!findedAlbum) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return findedAlbum;
  }

  createAlbum(albumData: CreateAlbumDto): IAlbum {
    const newAlbum = new Album(
      albumData.name,
      albumData.year,
      albumData.artistId ? albumData.artistId : null,
    );

    InMemoryStore.albums.push({ ...newAlbum });

    return newAlbum;
  }

  updateAlbum(id: number, updateAlbumData: UpdateAlbumDto): IAlbum {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const albumBeforeUpdate = InMemoryStore.albums.find(
      (album) => album.id === String(id),
    );

    if (!albumBeforeUpdate) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    InMemoryStore.albums = InMemoryStore.albums.filter(
      (album) => album.id !== String(id),
    );

    const albumDataAfterUpdate = { ...albumBeforeUpdate, ...updateAlbumData };

    InMemoryStore.albums.push(albumDataAfterUpdate);

    return albumDataAfterUpdate;
  }

  deleteAlbum(id: number): IAlbum {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const albumForDelete = InMemoryStore.albums.find(
      (album) => album.id === String(id),
    );

    if (!albumForDelete) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    InMemoryStore.albums = InMemoryStore.albums.filter(
      (album) => album.id !== String(id),
    );

    InMemoryStore.tracks = InMemoryStore.tracks.map((track) => {
      if (track.albumId === String(id)) {
        return { ...track, albumId: null };
      }
      return track;
    });

    InMemoryStore.favourites.tracks = InMemoryStore.favourites.tracks.filter(
      (track) => track.id !== String(id),
    );

    return albumForDelete;
  }
}
