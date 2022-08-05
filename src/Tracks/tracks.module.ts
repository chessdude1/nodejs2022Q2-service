import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackDbEntity } from './entities/trackDb.entity';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackDbEntity])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
