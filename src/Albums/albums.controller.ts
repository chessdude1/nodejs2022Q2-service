import { AlbumsService } from './albums.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('/artist')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAlbums(): Array<IAlbum> {
    return this.albumsService.getArtists();
  }
}
