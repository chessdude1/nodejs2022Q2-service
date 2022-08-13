import { UpdateAlbumDto } from './dto/update-album.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album } from './albums.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { validate } from 'uuid';
import { IAlbum } from './albums.interface';
import { AlbumDbEntity } from './entities/albumDb.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackDbEntity } from 'src/Tracks/entities/trackDb.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumDbEntity)
    private albumRepository: Repository<AlbumDbEntity>,
    @InjectRepository(TrackDbEntity)
    private trackRepository: Repository<TrackDbEntity>,
  ) {}

  async getAlbums(): Promise<Array<IAlbum>> {
    return await this.albumRepository.find();
  }

  async getAlbum(id: number): Promise<IAlbum> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedAlbum = await this.albumRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (!findedAlbum) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return findedAlbum;
  }

  async createAlbum(albumData: CreateAlbumDto): Promise<IAlbum> {
    const newAlbum = new Album(
      albumData.name,
      albumData.year,
      albumData.artistId ? albumData.artistId : null,
    );

    return (await this.albumRepository.save({ ...newAlbum })).toResponse();
  }

  async updateAlbum(
    id: number,
    updateAlbumData: UpdateAlbumDto,
  ): Promise<IAlbum> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const albumBeforeUpdate = await this.albumRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (!albumBeforeUpdate) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    const albumDataAfterUpdate = { ...albumBeforeUpdate, ...updateAlbumData };

    this.albumRepository.save(albumDataAfterUpdate);

    return albumDataAfterUpdate;
  }

  async deleteAlbum(id: number): Promise<IAlbum> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const albumForDelete = await this.albumRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (!albumForDelete) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    const track = await this.trackRepository.findOne({
      where: {
        albumId: String(id),
      },
    });

    if (track) {
      track.albumId = null;
      this.trackRepository.save(track);
    }

    await this.albumRepository.remove(albumForDelete);

    return (await albumForDelete).toResponse();
  }
}
