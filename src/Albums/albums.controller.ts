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
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('/album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAlbums(): Array<IAlbum> {
    return this.albumsService.getAlbums();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getAlbum(@Param('id') id: number) {
    return this.albumsService.getAlbum(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createAlbum(@Param('id') id: number, @Body() albumData: CreateAlbumDto) {
    return this.albumsService.createAlbum(albumData);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateAlbum(
    @Param('id') id: number,
    @Body() updateAlbumData: UpdateAlbumDto,
  ) {
    return this.albumsService.updateAlbum(id, updateAlbumData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: number) {
    return this.albumsService.deleteAlbum(id);
  }
}
