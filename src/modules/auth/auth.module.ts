import { JwtModule, JwtService } from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SignInUseCase } from 'src/core/auth/application/use-cases/sign-in.use-case';
import { IUserRepository } from 'src/core/user/domain/contracts/user-repository.interface';
import { UsersModule } from '../users/users.module';
import { UserRepository } from 'src/core/user/infra/repositories/user.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Global()
@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: SignInUseCase,
      useFactory: (userRepo: IUserRepository, jwtService: JwtService) => {
        return new SignInUseCase(userRepo, jwtService);
      },
      inject: [UserRepository, JwtService],
    },
  ],
  exports: [JwtModule],
})
export class AuthModule {}
