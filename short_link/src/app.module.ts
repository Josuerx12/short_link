import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { UrlsModule } from './modules/urls/urls.module';
import { DatabaseModule } from './modules/database/database.module';
import { ApplicationModule } from './modules/application/application.module';
import { AuthGuardModule } from './modules/auth-guard/auth-guard.module';
import { AuthModule } from './modules/auth/auth.module';
import { BullModule } from '@nestjs/bullmq';
import { UrlVisitGatewayModule } from './modules/url-visit/url-visit-gateway.module';
import { AuthStorageMiddleware } from './modules/auth-storage/auth-storage.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    UrlVisitGatewayModule,
    UsersModule,
    UrlsModule,
    ApplicationModule,
    AuthGuardModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthStorageMiddleware).forRoutes('*');
  }
}
