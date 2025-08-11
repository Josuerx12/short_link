import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserByIdDto, UpdateUserDto } from './dto/update-user.dto';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { IsPublic } from 'src/core/auth/application/decorators/is-public.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds a user by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    description: "The user's ID.",
  })
  @ApiResponse({ status: 200, description: 'The user was found successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param() params: GetUserByIdDto) {
    return this.usersService.findOne(params);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates a user by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    description: "The user's ID.",
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(
    @Param() params: UpdateUserByIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(params, updateUserDto);
  }
}
