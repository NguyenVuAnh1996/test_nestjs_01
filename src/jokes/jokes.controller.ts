import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { CreateJokeDto } from './dto/create-joke.dto';
import { UpdateJokeDto } from './dto/update-joke.dto';

@Controller('api/jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Post()
  create(@Body() createJokeDto: CreateJokeDto) {
    return this.jokesService.create(createJokeDto);
  }

  @Get()
  async findAll(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Req() req: Request
  ) {
    return await this.jokesService.findAll(pageNumber, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jokesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJokeDto: UpdateJokeDto) {
    return this.jokesService.update(+id, updateJokeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jokesService.remove(+id);
  }
}
