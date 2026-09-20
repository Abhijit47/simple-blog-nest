import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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

export class CreateArticleDto {
  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title!: string;

  // @ApiProperty({ required: false })
  // @IsEmpty()
  @IsString()
  description?: string;

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  body!: string;

  // @ApiProperty({ required: false, default: false })
  @IsBoolean()
  published?: boolean = false;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
// export class UpdateArticleDto extends Partial<typeof CreateArticleDto> {}

export class UpdateBlogDto {
  @IsString()
  title?: string;

  @IsString()
  content?: string;
}
