import { ArtistController } from './artists.controller';
import { Module } from '@nestjs/common';
import { ArtistService } from './artists.service';
import { ArtistDbEntity } from './entities/artistDbEntity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackDbEntity } from 'src/Tracks/entities/trackDb.entity';
import { AlbumDbEntity } from 'src/Albums/entities/albumDb.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArtistDbEntity,
      TrackDbEntity,
      AlbumDbEntity,
      AlbumDbEntity,
    ]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistsModule {}
