import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBlogDto, UpdateBlogDto, type Blog } from './blogs.dto.interface';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  findAll(): Blog[] {
    return this.blogsService.getBlogs();
  }

  @Get(':id')
  findOne(@Param() params: { id: string }): Blog {
    return this.blogsService.getBlogById(params.id);
  }

  @Post()
  createOne(
    @Body()
    body: CreateBlogDto,
  ): Blog {
    const { title, content } = body;
    console.log('Received create blog request:', { title, content });
    return this.blogsService.createBlog({ title, content });
  }

  @Patch(':id')
  updateOne(
    @Param() params: { id: string },
    @Body() body: UpdateBlogDto,
  ): Blog {
    const { title, content } = body;
    return this.blogsService.updateBlog(params.id, { title, content });
  }

  @Delete(':id')
  deleteOne(@Param() params: { id: string }): void {
    this.blogsService.deleteBlog(params.id);
  }
}
