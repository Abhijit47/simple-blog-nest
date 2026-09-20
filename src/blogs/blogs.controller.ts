import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from './blogs.dto.interface';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  async findAll() {
    return await this.blogsService.findAll();
  }

  @Get()
  async findDrafts() {
    return await this.blogsService.findDrafts();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.blogsService.findOne(id);
  }

  @Post()
  async createOne(@Body() body: CreateArticleDto) {
    // const { title, content } = body;
    // console.log('Received create blog request:', { title, content });
    return await this.blogsService.create(body);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() body: UpdateArticleDto) {
    return await this.blogsService.update(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.blogsService.remove(id);
  }
}
