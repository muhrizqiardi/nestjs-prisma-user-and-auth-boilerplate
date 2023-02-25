import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ format: 'password', minLength: 8 })
  password: string;
}
