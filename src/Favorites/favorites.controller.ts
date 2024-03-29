import { FavoritesService } from './favorites.service';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { IFavorites } from './favorites.interface';
import { ITrack } from 'src/Tracks/tracks.interface';
import { IAlbum } from 'src/Albums/albums.interface';
import { IArtist } from 'src/Artists/artists.interface';

@Controller('/favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getFavorites(): IFavorites {
    return this.favoritesService.getFavorites();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavorites(@Param('id') id: number): ITrack {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavorites(@Param('id') id: number): IAlbum {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavorites(@Param('id') id: number): IArtist {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFavorites(@Param('id') id: number): ITrack {
    return this.favoritesService.deleteTrackFromFavorites(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavorites(@Param('id') id: number): IAlbum {
    return this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFavorites(@Param('id') id: number): IArtist {
    return this.favoritesService.deleteArtistFromFavorites(id);
  }
}
