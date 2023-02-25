import { ApiProperty } from '@nestjs/swagger';

export class JwtPayloadEntity {
  @ApiProperty()
  access_token: string;
}
