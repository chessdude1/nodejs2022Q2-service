import { Artist } from './artists.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IArtist } from './artists.interface';
import { validate } from 'uuid';
import { ArtistDbEntity } from './entities/artistDbEntity.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistDbEntity)
    private artistRepository: Repository<ArtistDbEntity>,
  ) {}

  async getArtists(): Promise<Array<IArtist>> {
    return await this.artistRepository.find();
  }

  async getArtist(id: number): Promise<IArtist> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedArtist = await this.artistRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (!findedArtist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return findedArtist.toResponse();
  }

  async createArtist(artistData: CreateArtistDto): Promise<IArtist> {
    const newArtist = new Artist(artistData.name, artistData.grammy);
    return (await this.artistRepository.save({ ...newArtist })).toResponse();
  }

  async updateArtist(
    id: number,
    artistData: CreateArtistDto,
  ): Promise<IArtist> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedArtist = await this.artistRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (!findedArtist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    const updatedArtist = {
      ...findedArtist,
      ...artistData,
    };

    await this.artistRepository.save(updatedArtist);

    return updatedArtist;
  }

  async deleteArtist(id: number) {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedArtist = await this.artistRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (!findedArtist) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    await this.artistRepository.remove(findedArtist);

    return findedArtist.toResponse();
  }
}
