import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumDbEntity } from './entities/albumDb.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumDbEntity])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
