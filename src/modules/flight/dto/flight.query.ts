import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class FlightSearchQuery {
  @IsString()
  departureDate: string;

  @IsString()
  origin: string;

  @IsOptional()
  @IsString()
  destination?: string;

  @IsOptional()
  @IsString()
  returnDate?: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  adults: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  children: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  infants: number;

  @IsString()
  cabinClass: string;

  @IsOptional()
  @IsString()
  fareFamily?: string;

  @IsOptional()
  @IsString()
  airlineCode?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  stopCount?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  limit?: number = 20;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  onlyFlightsWithPrice?: boolean;

  @IsOptional()
  @IsString()
  legClass?: string;
}
