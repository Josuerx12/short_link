import { NestFactory } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/sequelize';
import { MigrationsModule } from './modules/database/migrations.module';
import { seeder } from './core/shared/infra/database/sequelize/seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MigrationsModule, {
    logger: ['error'],
  });

  const sequelize = app.get(getConnectionToken());

  seeder(sequelize).runAsCLI();
}
bootstrap();
