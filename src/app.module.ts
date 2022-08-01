import { UserTestModule } from './UserTEST/userTest.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './Albums/albums.module';
import { ArtistsModule } from './Artists/artists.module';
import { configValidationSchema } from './config/config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule.forRoot({
      envFilePath: ['proccess.env'],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
})
export class AppModule {}
