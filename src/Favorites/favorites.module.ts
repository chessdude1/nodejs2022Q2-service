import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumDbEntity } from 'src/Albums/entities/albumDb.entity';
import { ArtistDbEntity } from 'src/Artists/entities/artistDbEntity.entity';
import { TrackDbEntity } from 'src/Tracks/entities/trackDb.entity';
import { FavoritesDbEntity } from './entities/favoriteDbEntity.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritesDbEntity,
      TrackDbEntity,
      ArtistDbEntity,
      AlbumDbEntity,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
