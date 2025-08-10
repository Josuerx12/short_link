import { Global, Module } from '@nestjs/common';
import { ApplicationService } from 'src/core/shared/application/application.service';
import { UnitOfWork } from 'src/core/shared/infra/unit-of-work';

@Global()
@Module({
  providers: [UnitOfWork, ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
