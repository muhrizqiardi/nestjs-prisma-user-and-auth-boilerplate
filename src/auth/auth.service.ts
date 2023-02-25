import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findOne({
        email,
      });
      const passwordIsMatch = bcrypt.compareSync(password, user.password);

      if (!passwordIsMatch) throw new Error('Password is not match');

      return user;
    } catch (error) {
      return null;
    }
  }
}
