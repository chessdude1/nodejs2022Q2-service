import { Module } from '@nestjs/common';
import { AlbumsModule } from './Albums/albums.module';
import { ArtistsModule } from './Artists/artists.module';
import { TracksModule } from './Tracks/tracks.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, TracksModule, ArtistsModule, AlbumsModule],
})
export class AppModule {}
