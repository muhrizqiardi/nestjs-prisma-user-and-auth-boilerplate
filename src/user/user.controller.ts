import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return plainToInstance(UserEntity, this.userService.create(createUserDto));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id', ParseIntPipe) id: number, @Request() request: any) {
    if (request.user.userId !== id) throw new UnauthorizedException();

    return plainToInstance(
      UserEntity,
      this.userService.findOne({
        id: request.user.userId,
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Request() request: any,
    @Body() createUserDto: CreateUserDto,
  ) {
    if (request.user.userId !== id) throw new UnauthorizedException();

    return plainToInstance(
      UserEntity,
      this.userService.update(id, createUserDto),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  delete(@Param('id', ParseIntPipe) id: number, @Request() request: any) {
    if (request.user.userId !== id) throw new UnauthorizedException();

    return plainToInstance(UserEntity, this.userService.delete(id));
  }
}
