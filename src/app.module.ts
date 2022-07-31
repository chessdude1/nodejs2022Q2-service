import { UserTestModule } from './UserTEST/userTest.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './Albums/albums.module';
import { ArtistsModule } from './Artists/artists.module';
import configService from './config/config.service';
import { FavoritesModule } from './Favorites/favorites.module';
import { TracksModule } from './Tracks/tracks.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    UserTestModule,
    TypeOrmModule.forRoot(configService),
  ],
})
export class AppModule {}
