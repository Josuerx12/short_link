import { Module } from '@nestjs/common';
import { UnitOfWork } from 'src/core/shared/application/unit-of-work';

@Module({
  providers: [UnitOfWork],
  exports: [UnitOfWork],
})
export class UnitOfWorkModule {}
