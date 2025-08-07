import { Injectable } from '@nestjs/common';
import { CreateUrlVisitDto } from './dto/create-url-visit.dto';
import { UpdateUrlVisitDto } from './dto/update-url-visit.dto';

@Injectable()
export class UrlVisitsService {
  create(createUrlVisitDto: CreateUrlVisitDto) {
    return 'This action adds a new urlVisit';
  }

  findAll() {
    return `This action returns all urlVisits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} urlVisit`;
  }

  update(id: number, updateUrlVisitDto: UpdateUrlVisitDto) {
    return `This action updates a #${id} urlVisit`;
  }

  remove(id: number) {
    return `This action removes a #${id} urlVisit`;
  }
}
