import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import * as urlVisitGatewayInterface from 'src/core/url-visits/domain/constracts/url-visit-gateway.interface';

@Processor('urlVisits')
export class UrlVisitProcessor extends WorkerHost {
  constructor(
    private readonly urlVisitGateway: urlVisitGatewayInterface.IUrlVisitGateway,
  ) {
    super();
  }

  async process(job: Job): Promise<any> {
    console.log('---------Job Started-----------');
    console.log('Registrando visita.');
    console.log('---------Job Started-----------');

    const { urlId, accessedAt, ip, userAgent } = job.data;

    await this.urlVisitGateway.addVisit({
      urlId,
      accessedAt,
      ip,
      userAgent,
    });
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log('-----------------------Job Completed--------------------');
    console.log(`Visita na url encurtada id ${job.data.urlId} registrada.`);
    console.log('-----------------------Job Completed--------------------');
  }

  @OnWorkerEvent('failed')
  onFail(job: Job) {
    console.error('-----------ERROR-----------');
    console.error(
      'Error ao registrar visita na url encurtada id ',
      job.data.urlId,
      '.',
    );
    console.error('-----------ERROR-----------');
  }
}
