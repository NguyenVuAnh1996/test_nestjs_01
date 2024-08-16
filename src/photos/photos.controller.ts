import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
// import { diskStorage } from 'multer';

@Controller('api/photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) { }

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photosService.create(createPhotoDto);
  }

  @Get()
  async findAll() {
    return await this.photosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photosService.update(+id, updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photosService.remove(+id);
  }

  @Post('upload')
  // @UseInterceptors(FileInterceptor(
  //   'file', {
  //     storage: diskStorage({
  //       destination: './uploads/images/',
  //       filename: (req: any, file: Express.Multer.File, cb: (err: Error | null, fileName: string) => void) => 
  //         cb(null, file.originalname)
  //     })
  //   }
  // ))
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    let _file = new CreatePhotoDto();
    _file.url = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    return await this.photosService.create(_file);
  }
}
