import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { UrlsModule } from './modules/urls/urls.module';
import { DatabaseModule } from './modules/database/database.module';
import { ApplicationModule } from './modules/application/application.module';
import { AuthGuardModule } from './modules/auth-guard/auth-guard.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    UrlsModule,
    ApplicationModule,
    AuthGuardModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
