import { Module } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Joke } from './entities/joke.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Joke])],
  controllers: [JokesController],
  providers: [JokesService],
})
export class JokesModule {}
