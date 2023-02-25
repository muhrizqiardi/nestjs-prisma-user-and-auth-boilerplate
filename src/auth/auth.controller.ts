import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Login successful', type: UserEntity })
  @Post()
  async login(@Request() req) {
    return req.user;
  }
}
