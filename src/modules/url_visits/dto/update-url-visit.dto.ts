import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlVisitDto } from './create-url-visit.dto';

export class UpdateUrlVisitDto extends PartialType(CreateUrlVisitDto) {}
