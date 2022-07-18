import { ArtistController } from './artists.controller';
import { Module } from '@nestjs/common';
import { ArtistService } from './artists.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistsModule {}
