import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
