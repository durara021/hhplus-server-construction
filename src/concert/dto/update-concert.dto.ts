import { PartialType } from '@nestjs/mapped-types';
import { CreateConcertDto } from './create-concert.dto';

export class UpdateConcertDto extends PartialType(CreateConcertDto) {}
