import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog, CreateBlogDto, UpdateBlogDto } from './blogs.dto.interface';

@Injectable()
export class BlogsService {
  private readonly blogs: Blog[] = [
    {
      id: '88ce5d32-30ab-44e3-a348-3c2757f86620',
      title: 'First Blog',
      content: 'This is the content of the first blog.',
    },
    {
      id: 'a7400117-1ef7-4518-b64e-62b59207b3b0',
      title: 'Second Blog',
      content: 'This is the content of the second blog.',
    },
    {
      id: 'd56ce189-b126-49a4-98d6-a03a210ab1b1',
      title: 'Third Blog',
      content: 'This is the content of the third blog.',
    },
  ];

  private generateUniqueId(): string {
    return crypto.randomUUID();
  }

  getBlogs(): Blog[] {
    return this.blogs;
  }

  getBlogById(id: string): Blog {
    const blog = this.blogs.find((blog) => blog.id === id);
    if (!blog) {
      throw new NotFoundException(`Blog with id #${id} not found`);
    }
    return blog;
  }

  createBlog(createBlogDto: CreateBlogDto): Blog {
    const { title, content } = createBlogDto;
    const newBlog: Blog = {
      id: this.generateUniqueId(),
      title,
      content,
    };
    this.blogs.push(newBlog);
    return newBlog;
  }

  updateBlog(id: string, updateBlogDto: UpdateBlogDto): Blog {
    const { title, content } = updateBlogDto;

    // find the blog by id this.getBlogById(id);
    const blog = this.getBlogById(id);

    if (title) {
      blog.title = title;
    }

    if (content) {
      blog.content = content;
    }

    return blog;
  }

  deleteBlog(id: string): void {
    const blog = this.getBlogById(id);
    const index = this.blogs.indexOf(blog);
    if (index > -1) {
      this.blogs.splice(index, 1);
    }
  }
}
