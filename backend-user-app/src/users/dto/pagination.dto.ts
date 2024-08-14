import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationQuery {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  pageSize?: number = 10;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  search?: string;
}
