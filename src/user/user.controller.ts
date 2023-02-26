import {
  Body,
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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  findOne(@Param('id', ParseIntPipe) id: number, @Request() request: any) {
    if (request.user.userId !== id) throw new UnauthorizedException();

    return this.userService.findOne({
      id: request.user.userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Request() request: any,
    @Body() createUserDto: CreateUserDto,
  ) {
    if (request.user.userId !== id) throw new UnauthorizedException();

    return this.userService.update(id, createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  delete(@Param('id', ParseIntPipe) id: number, @Request() request: any) {
    if (request.user.userId !== id) throw new UnauthorizedException();

    return this.userService.delete(id);
  }
}
