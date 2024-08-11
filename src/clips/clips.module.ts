import { Module } from '@nestjs/common';
import { ClipsService } from './clips.service';
import { ClipsController } from './clips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clip } from './entities/clip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clip])],
  controllers: [ClipsController],
  providers: [ClipsService],
})
export class ClipsModule {}
