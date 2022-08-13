import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAlbum } from 'src/Albums/albums.interface';
import { AlbumDbEntity } from 'src/Albums/entities/albumDb.entity';
import { IArtist } from 'src/Artists/artists.interface';
import { ArtistDbEntity } from 'src/Artists/entities/artistDbEntity.entity';
import { TrackDbEntity } from 'src/Tracks/entities/trackDb.entity';
import { ITrack } from 'src/Tracks/tracks.interface';
import { EntityNotFoundError, Repository } from 'typeorm';
import { validate } from 'uuid';
import { FavoritesDbEntity } from './entities/favoriteDbEntity.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(ArtistDbEntity)
    private artistRepository: Repository<ArtistDbEntity>,
    @InjectRepository(TrackDbEntity)
    private trackRepository: Repository<TrackDbEntity>,
    @InjectRepository(AlbumDbEntity)
    private albumRepository: Repository<AlbumDbEntity>,
    @InjectRepository(FavoritesDbEntity)
    private favoriteRepository: Repository<FavoritesDbEntity>,
  ) {}

  async checkOnFirstItem(zeroElem) {
    if (!zeroElem) {
      await this.favoriteRepository.save({
        id: '9b429e6c-323d-4ec4-b5d9-6fa09babe92d',
      });
    }
  }

  async getFavorites(): Promise<any> {
    const res = await this.favoriteRepository.find({
      relations: ['artists', 'tracks', 'albums'],
    });

    if (!res[0]) {
      await this.checkOnFirstItem(res[0]);
      return {
        artists: [],
        tracks: [],
        albums: [],
      };
    }

    const lastUpdated = res[0];

    delete lastUpdated.id;
    return lastUpdated;
  }

  async addTrackToFavorites(id: number): Promise<ITrack> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }
    const track = await this.trackRepository.findOne(id);

    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const res = await this.favoriteRepository.find({
      relations: ['artists', 'tracks', 'albums'],
    });

    await this.checkOnFirstItem(res[0]);

    res[0].tracks.push(track);
    await this.favoriteRepository.save(res);
    return track;
  }

  async addAlbumToFavorites(id: number): Promise<IAlbum> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumRepository.findOne(id);

    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const res = await this.favoriteRepository.find({
      relations: ['artists', 'tracks', 'albums'],
    });

    await this.checkOnFirstItem(res[0]);

    res[0].albums.push(album);
    await this.favoriteRepository.save(res);
    return album;
  }

  async addArtistToFavorites(id: number): Promise<IArtist> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistRepository.findOne(id);

    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const res = await this.favoriteRepository.find({
      relations: ['artists', 'tracks', 'albums'],
    });

    await this.checkOnFirstItem(res[0]);

    res[0].artists.push(artist);
    await this.favoriteRepository.save(res);
    return artist;
  }

  async deleteTrackFromFavorites(id: number): Promise<ITrack> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const res = await this.favoriteRepository.find({
      relations: ['artists', 'tracks', 'albums'],
    });

    await this.checkOnFirstItem(res[0]);

    const findedTrack = res[0].tracks.find((track) => track.id === String(id));

    if (!findedTrack) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    res[0].tracks = res[0].tracks.filter((artist) => artist.id !== String(id));

    await this.favoriteRepository.save(res);

    return findedTrack;
  }

  async deleteAlbumFromFavorites(id: number): Promise<IAlbum> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const res = await this.favoriteRepository.find({
      relations: ['artists', 'tracks', 'albums'],
    });

    await this.checkOnFirstItem(res[0]);

    const findedAlbum = res[0].albums.find((album) => album.id === String(id));

    if (!findedAlbum) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    res[0].albums = res[0].albums.filter((artist) => artist.id !== String(id));

    await this.favoriteRepository.save(res);

    return findedAlbum;
  }

  async deleteArtistFromFavorites(id: number): Promise<IArtist> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const res = await this.favoriteRepository.find({
      relations: ['artists', 'tracks', 'albums'],
    });

    await this.checkOnFirstItem(res[0]);

    const findedArtist = res[0].artists.find(
      (artist) => artist.id === String(id),
    );

    if (!findedArtist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    res[0].artists = res[0].artists.filter(
      (artist) => artist.id !== String(id),
    );

    await this.favoriteRepository.save(res);

    return findedArtist;
  }
}
