import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthLoginResponse } from './entities/auth-login-response.entity';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Login successful', type: AuthLoginResponse })
  @Post()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
