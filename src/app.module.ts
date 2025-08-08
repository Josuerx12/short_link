import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { UrlsModule } from './modules/urls/urls.module';
import { UrlVisitsModule } from './modules/url-visits/url_visits.module';
import { UnitOfWorkModule } from './modules/unit-of-work/unit-of-work.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('MODE') === 'dev' ? true : false,
        logging: configService.get<string>('MODE') === 'dev' ? true : false,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    UrlsModule,
    UrlVisitsModule,
    UnitOfWorkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
