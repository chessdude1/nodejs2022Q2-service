import { ArtistService } from './artists.service';
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
import { CreateArtistDto } from './dto/create-artist.dto';
import { IArtist } from './artists.interface';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('/artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getArtists(): Array<IArtist> {
    return this.artistService.getArtists();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getArtist(@Param('id') id: number): IArtist {
    return this.artistService.getArtist(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createArtist(@Body() artistData: CreateArtistDto): IArtist {
    return this.artistService.createArtist(artistData);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateArtist(
    @Param('id') id: number,
    @Body() updateArtistData: UpdateArtistDto,
  ): IArtist {
    return this.artistService.updateArtist(id, updateArtistData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteArtist(@Param('id') id: number): IArtist {
    return this.artistService.deleteArtist(id);
  }
}
