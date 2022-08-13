import { UpdateTrackDto } from './dto/update-track.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './tracks.entity';
import { ITrack } from './tracks.interface';
import { validate } from 'uuid';
import { TrackDbEntity } from './entities/trackDb.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackDbEntity)
    private trackRepository: Repository<TrackDbEntity>,
  ) {}

  async getTracks(): Promise<ITrack[]> {
    return await this.trackRepository.find();
  }

  async getTrack(id: number): Promise<ITrack> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedTrack = await this.trackRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (!findedTrack) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return findedTrack;
  }

  async createTrack(track: CreateTrackDto): Promise<ITrack> {
    const newTrack = new Track(
      track.name,
      track.artistId ? track.artistId : null,
      track.albumId ? track.albumId : null,
      track.duration,
    );

    return (await this.trackRepository.save({ ...newTrack })).toResponse();
  }

  async updateTrack(id: number, trackData: UpdateTrackDto): Promise<ITrack> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const trackToUpdate = await this.trackRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (!trackToUpdate) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    const updatedTrack = {
      ...trackToUpdate,
      ...trackData,
    };

    await this.trackRepository.save(updatedTrack);

    return updatedTrack;
  }

  async deleteTrack(id: number): Promise<ITrack> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedTrack = await this.trackRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (!findedTrack) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    await this.trackRepository.remove(findedTrack);

    return findedTrack.toResponse();
  }
}
