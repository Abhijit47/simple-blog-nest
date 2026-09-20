import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto, UpdateArticleDto } from './blogs.dto.interface';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.article.findMany({ where: { published: true } });
  }

  async findDrafts() {
    return await this.prisma.article.findMany({ where: { published: false } });
  }

  async findOne(id: string) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with id #${id} not found`);
    }
    return article;
  }

  async create(createArticleDto: CreateArticleDto) {
    return await this.prisma.article.create({ data: createArticleDto });
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    if (this.findOne(id) === null) {
      throw new NotFoundException(`Article with id #${id} not found`);
    }

    return await this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: string) {
    if (this.findOne(id) === null) {
      throw new NotFoundException(`Article with id #${id} not found`);
    }
    return await this.prisma.article.delete({ where: { id } });
  }
}
