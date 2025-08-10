import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlVisitDto } from './dto/create-url-visit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UrlVisit } from './models/url-visit.model';
import { Model } from 'mongoose';
import { ShortUrlGateway } from './gateway/short-url.gateway';

@Injectable()
export class UrlVisitsService {
  constructor(
    @InjectModel(UrlVisit.name) private urlVisitModel: Model<UrlVisit>,
    private readonly shortUrlGateway: ShortUrlGateway,
  ) {}

  async create(createUrlVisitDto: CreateUrlVisitDto) {
    const url = await this.shortUrlGateway.findUrl(createUrlVisitDto.urlId);

    if (!url) {
      console.error('URL not found', createUrlVisitDto.urlId);
      throw new NotFoundException(
        `Url with ID ${createUrlVisitDto.urlId} not found`,
      );
    }

    const urlVisit = new this.urlVisitModel({
      ...createUrlVisitDto,
      accessedAt: new Date(createUrlVisitDto.accessedAt),
    });

    await urlVisit.save();

    return urlVisit;
  }

  async findAllUrlVisits(urlId: string) {
    const models = await this.urlVisitModel.find({ urlId }).exec();

    return models.map((model) => model.toObject());
  }

  async findOne(id: string) {
    const model = await this.urlVisitModel.findOne({ _id: id }).exec();

    if (!model) {
      throw new NotFoundException(`UrlVisit with ID ${id} not found`);
    }

    return model.toObject({});
  }
}
