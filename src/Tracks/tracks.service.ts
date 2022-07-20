import { UpdateTrackDto } from './dto/update-track.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryStore } from 'src/inMemoryDataBase/dataBase';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './tracks.entity';
import { ITrack } from './tracks.interface';
import { validate } from 'uuid';

@Injectable()
export class TracksService {
  // private tracks: Array<ITrack> = InMemoryStore.tracks;

  getTracks(): Array<ITrack> {
    return InMemoryStore.tracks;
  }

  getTrack(id: number): ITrack {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedTrack = InMemoryStore.tracks.find(
      (track) => track.id === String(id),
    );

    if (!findedTrack) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return findedTrack;
  }

  createTrack(track: CreateTrackDto): ITrack {
    const newTrack = new Track(
      track.name,
      track.artistId ? track.artistId : null,
      track.albumId ? track.albumId : null,
      track.duration,
    );

    InMemoryStore.tracks.push({ ...newTrack });

    return newTrack;
  }

  updateTrack(id: number, trackData: UpdateTrackDto): ITrack {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedTrack = InMemoryStore.tracks.find(
      (track) => track.id === String(id),
    );

    if (!findedTrack) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    const updatedTrack = {
      ...findedTrack,
      ...trackData,
    };

    InMemoryStore.tracks = InMemoryStore.tracks.filter(
      (track) => track.id !== String(id),
    );

    InMemoryStore.tracks.push(updatedTrack);

    return updatedTrack;
  }

  deleteTrack(id: number): ITrack {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }
    const findedTrack = InMemoryStore.tracks.find(
      (track) => track.id === String(id),
    );

    InMemoryStore.tracks = InMemoryStore.tracks.filter(
      (track) => track.id !== String(id),
    );

    if (!findedTrack) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return findedTrack;
  }
}
