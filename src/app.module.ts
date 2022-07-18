import { Module } from '@nestjs/common';
import { TracksModule } from './Tracks/tracks.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, TracksModule],
})
export class AppModule {}
