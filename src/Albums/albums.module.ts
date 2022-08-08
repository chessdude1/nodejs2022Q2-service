import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackDbEntity } from 'src/Tracks/entities/trackDb.entity';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumDbEntity } from './entities/albumDb.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumDbEntity, TrackDbEntity])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
