import { Injectable } from '@nestjs/common';
import { CreateJokeDto } from './dto/create-joke.dto';
import { UpdateJokeDto } from './dto/update-joke.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Joke } from './entities/joke.entity';
import { Repository } from 'typeorm';
import { JokeDto } from './dto/joke.dto';

@Injectable()
export class JokesService {
  constructor(
    @InjectRepository(Joke)
    private repo: Repository<Joke>
  ) {}
  create(createJokeDto: CreateJokeDto) {
    return 'This action adds a new joke';
  }

  async findAll(
    pageNumber: number,
    pageSize: number
  ): Promise<JokeDto[]> {
    const config = pageNumber > 0 && pageSize >= 0
    ? {
      take: pageSize,
      skip: (pageNumber - 1) * pageSize
    } : {};
    let result = (await this.repo.find(config)) as JokeDto[];
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} joke`;
  }

  update(id: number, updateJokeDto: UpdateJokeDto) {
    return `This action updates a #${id} joke`;
  }

  remove(id: number) {
    return `This action removes a #${id} joke`;
  }
}
