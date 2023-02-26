import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginResponse {
  @ApiProperty()
  access_token: string;
}
