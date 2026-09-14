import { IsString } from 'class-validator';

export interface Blog {
  id: string;
  title: string;
  content: string;
}

export class CreateBlogDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;
}

export class UpdateBlogDto {
  @IsString()
  title?: string;

  @IsString()
  content?: string;
}
