import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
  }

  async findOne(findOneUserDto: FindOneUserDto) {
    return this.prisma.user.findUnique({
      where: findOneUserDto,
    });
  }

  async update(id: number, updateUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);

    return this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto, password: hashedPassword },
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
