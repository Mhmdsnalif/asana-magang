import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/User.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    // find if user exist with this email
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = user['dataValues'];
    return result;
    
  }

  async login(user: User): Promise<{ user: User; token: string }> {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user) {
    // hash the password
    const pass = await this.hashPassword(user.password);

    // Check if password and repassword match
    if (user.password !== user.repassword) {
      throw new BadRequestException('Password and repassword do not match');
    }

    // Omit repassword from the user object
    const { repassword, ...userWithoutRepassword } = user;

    // create the user
    const newUser = await this.userService.create({
      ...userWithoutRepassword,
      password: pass,
    });

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newUser['dataValues'];

    // generate token
    const token = await this.generateToken(result);

    // return the user and the token
    return { user: result, token };
  }

  public async getDataUser() {
    const getData = await this.userService.getDataUser();
    return getData;
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
