import { getQueueToken } from '@nestjs/bullmq';
import { getModelToken } from '@nestjs/sequelize';
import { Queue } from 'bullmq';
import { ApplicationService } from 'src/core/shared/application/application.service';
import { IUrlVisitGateway } from 'src/core/url-visits/domain/constracts/url-visit-gateway.interface';
import { UrlVisitGateway } from 'src/core/url-visits/infra/gateways/url-visit.gateway';
import { CreateUrlUseCase } from 'src/core/url/application/use-cases/create-url.use-case';
import { DeleteUrlByIdUseCase } from 'src/core/url/application/use-cases/delete-url-by-id.use-case';
import { GetAllUrlUseCase } from 'src/core/url/application/use-cases/get-all-url.use-case';
import { GetUrlByCodeUseCase } from 'src/core/url/application/use-cases/get-url-by-code.use-case';
import { GetUrlByIdUseCase } from 'src/core/url/application/use-cases/get-url-by-id.use-case';
import { UpdateUrlUseCase } from 'src/core/url/application/use-cases/update-url.use-case';
import { UrlModel } from 'src/core/url/infra/models/url.model';
import { UrlRepository } from 'src/core/url/infra/repositories/url.repository';
import { UrlVisitProcessor } from 'src/core/url/processors/visit-url.processor';

const REPOSITORIES = {
  URL_REPOSITORY: {
    provide: 'UrlRepository',
    useExisting: UrlRepository,
  },

  URL_SEQUELIZE_REPOSITORY: {
    provide: UrlRepository,
    useFactory: (urlModel: typeof UrlModel) => {
      return new UrlRepository(urlModel);
    },
    inject: [getModelToken(UrlModel)],
  },
};

const USE_CASES = {
  GET_URL_BY_ID_USE_CASE: {
    provide: GetUrlByIdUseCase,
    useFactory: (
      repository: UrlRepository,
      urlVisitGateway: IUrlVisitGateway,
    ) => {
      return new GetUrlByIdUseCase(repository, urlVisitGateway);
    },
    inject: [UrlRepository, UrlVisitGateway],
  },
  CREATE_URL_USE_CASE: {
    provide: CreateUrlUseCase,
    useFactory: (appService: ApplicationService, repository: UrlRepository) => {
      return new CreateUrlUseCase(appService, repository);
    },
    inject: [ApplicationService, UrlRepository],
  },
  UPDATE_URL_USE_CASE: {
    provide: UpdateUrlUseCase,
    useFactory: (appService: ApplicationService, repository: UrlRepository) => {
      return new UpdateUrlUseCase(appService, repository);
    },
    inject: [ApplicationService, UrlRepository],
  },
  DELETE_URL_BY_ID_USE_CASE: {
    provide: DeleteUrlByIdUseCase,
    useFactory: (repository: UrlRepository) => {
      return new DeleteUrlByIdUseCase(repository);
    },
    inject: [UrlRepository],
  },
  GET_URL_BY_CODE_USE_CASE: {
    provide: GetUrlByCodeUseCase,
    useFactory: (repository: UrlRepository, queue: Queue) => {
      return new GetUrlByCodeUseCase(repository, queue);
    },
    inject: [UrlRepository, getQueueToken('urlVisits')],
  },
  GET_ALL_URL_USE_CASE: {
    provide: GetAllUrlUseCase,
    useFactory: (repository: UrlRepository) => {
      return new GetAllUrlUseCase(repository);
    },
    inject: [UrlRepository],
  },
};

const PROCESSORS = {
  URL_VISITS_PROCESSOR: {
    provide: UrlVisitProcessor,
    useFactory: (urlVisitGateway: IUrlVisitGateway) =>
      new UrlVisitProcessor(urlVisitGateway),
    inject: [UrlVisitGateway],
  },
};

export const URL_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
  PROCESSORS,
};
