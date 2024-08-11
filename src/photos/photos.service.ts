import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private repo: Repository<Photo>
  ) {}

  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const photo = this.repo.create({
      ...createPhotoDto
    });
    return await this.repo.save(photo);
  }

  async findAll() {
    return await this.repo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
