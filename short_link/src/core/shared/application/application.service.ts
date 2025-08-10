import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { UnitOfWork } from '../infra/unit-of-work';

@Injectable()
export class ApplicationService {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async run<T>(
    work: (transaction: Transaction) => Promise<T>,
    isolationLevel: Transaction.ISOLATION_LEVELS = Transaction.ISOLATION_LEVELS
      .SERIALIZABLE,
  ): Promise<T> {
    return this.unitOfWork.run(work, isolationLevel);
  }
}
