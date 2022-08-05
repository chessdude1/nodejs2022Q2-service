import { CreateTrackDto } from './dto/create-track.dto';
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
import { ITrack } from './tracks.interface';
import { TracksService } from './tracks.service';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('/track')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getTrack(@Param('id') id: number) {
    return this.trackService.getTrack(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createTrack(@Body() track: CreateTrackDto): Promise<ITrack> {
    return this.trackService.createTrack(track);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateTrack(
    @Param('id') id: number,
    @Body() trackData: UpdateTrackDto,
  ): Promise<ITrack> {
    return this.trackService.updateTrack(id, trackData);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTrack(@Param('id') id: number): Promise<ITrack> {
    return this.trackService.deleteTrack(id);
  }
}
