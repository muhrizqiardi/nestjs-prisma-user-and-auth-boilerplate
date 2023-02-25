import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    format: 'email',
  })
  email: string;

  @ApiProperty({
    format: 'password',
    minLength: 8,
  })
  password: string;
}
