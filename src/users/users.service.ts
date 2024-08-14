import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserForListDto } from './dto/user-forlist.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.repo.findOneBy({
      email: createUserDto.email
    })
    if (existingUser) {
      throw new BadRequestException('Trùng tài khoản')
    }
    // bổ sung validation cho các trường

    const user = this.repo.create({
      ... createUserDto
    })
    try {
      const newUser = await this.repo.save(user);
      return newUser;
    } catch {
      throw new InternalServerErrorException('Tạo tài khoản thất bại');
    }
  }

  async findByEmail(email: string) {
    return await this.repo.findOneBy({
      email
    })
  }

  async findAll() {
    return await this.repo.find({
      select: {
        id: true,
        email: true,
      }
    }) as UserForListDto[];
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({
      id
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
