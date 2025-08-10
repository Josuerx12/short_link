import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/core/user/infra/models/user.model';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          database: configService.get<string>('DB_DATABASE'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          autoLoadModels: false,
          models: [UserModel],
          dialectOptions: {
            useUTC: false,
            timezone: '-03:00',
          },
          timezone: '-03:00',
          logging: configService.get<string>('MODE') === 'dev' ? true : false,
          synchronize:
            configService.get<string>('MODE') === 'dev' ? true : false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
