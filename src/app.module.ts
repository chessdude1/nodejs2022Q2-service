import { Module } from '@nestjs/common';
import { ArtistsModule } from './Artists/artists.module';
import { TracksModule } from './Tracks/tracks.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, TracksModule, ArtistsModule],
})
export class AppModule {}
