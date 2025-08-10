import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserByIdDto, UpdateUserDto } from './dto/update-user.dto';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { IsPublic } from 'src/core/auth/application/decorators/is-public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param() params: GetUserByIdDto) {
    return this.usersService.findOne(params);
  }

  @Put(':id')
  update(
    @Param() params: UpdateUserByIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(params, updateUserDto);
  }
}
