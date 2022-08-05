import { ArtistController } from './artists.controller';
import { Module } from '@nestjs/common';
import { ArtistService } from './artists.service';
import { ArtistDbEntity } from './entities/artistDbEntity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistDbEntity])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistsModule {}
