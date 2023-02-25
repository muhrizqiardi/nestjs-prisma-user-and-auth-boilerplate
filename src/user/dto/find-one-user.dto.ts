import { Prisma } from '@prisma/client';

export class FindOneUserDto implements Prisma.UserWhereUniqueInput {
  id?: number;
  email?: string;
}
