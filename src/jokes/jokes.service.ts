import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async findOne(id: number) {
    let result = await this.repo.findOneBy({
      id
    })
    if (!result) {
      throw new InternalServerErrorException('Joke not found!')
    }
    return result as JokeDto;
  }

  async update(id: number, updateJokeDto: UpdateJokeDto) {
    const currentItem = await this.repo.findOneBy({
      id
    })
    if (!currentItem) {
      throw new InternalServerErrorException('Joke not found!')
    }
    const newItem = this.repo.create({
      ...currentItem,
      ...updateJokeDto
    })
    await this.repo.save(newItem);
    return true;
  }

  async remove(id: number) {
    await this.repo.delete({
      id
    })
    return true;
  }
}
