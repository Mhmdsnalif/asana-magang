import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  private failedLoginAttempts = new Map<string, number>();

  async validateUser(username: string, pass: string) {
    // Check if user has exceeded failed login attempts
    if (
      this.failedLoginAttempts.has(username) &&
      this.failedLoginAttempts.get(username) >= 3
    ) {
      throw new BadRequestException(
        'Anda telah mencapai batas login gagal. Tunggu beberapa saat sebelum mencoba lagi.',
      );
    }

    // Set a timeout to clear failed login attempts
    if (this.failedLoginAttempts.has(username)) {
      setTimeout(() => {
        this.failedLoginAttempts.delete(username);
      }, 6000); // Clear attempts after 1 minute
    }

    // find if user exist with this email
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      // Increment failed login attempts
      const currentAttempts = this.failedLoginAttempts.get(username) || 0;
      this.failedLoginAttempts.set(username, currentAttempts + 1);

      throw new BadRequestException(
        'Gagal masuk. Pastikan Anda Mengisi username dan password dengan benar.',
      );
    }

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

  async updatePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    // Temukan pengguna berdasarkan ID
    const user = await this.userService.findOneById(userId);

    // Memeriksa apakah kata sandi saat ini cocok
    const isCurrentPasswordValid = await this.comparePassword(
      currentPassword,
      user.password,
    );
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Kata sandi saat ini salah.');
    }

    // Hash kata sandi yang baru
    const hashedNewPassword = await this.hashPassword(newPassword);

    // Simpan kata sandi yang baru ke dalam database
    await this.userService.updatePassword(userId, hashedNewPassword);
  }

  // auth.service.ts

  async updateUser(
    userId: number,
    updatedUserData: Partial<User>,
  ): Promise<User> {
    // Temukan pengguna berdasarkan ID
    const user = await this.userService.findOneById(userId);

    // Jika pengguna tidak ditemukan, lempar NotFoundException
    if (!user) {
      throw new NotFoundException(
        `Pengguna dengan ID ${userId} tidak ditemukan`,
      );
    }

    // Jika ada upaya untuk mengubah email, periksa apakah email sudah digunakan oleh pengguna lain
    if (updatedUserData.email && updatedUserData.email !== user.email) {
      const existingUserWithSameEmail = await this.userService.findOneByEmail(
        updatedUserData.email,
      );

      if (existingUserWithSameEmail) {
        throw new BadRequestException(
          'Email sudah digunakan oleh pengguna lain',
        );
      }
    }
    // Update data pengguna kecuali kata sandi
    Object.assign(user, { ...updatedUserData, password: user.password });

    // Simpan perubahan ke dalam database
    return await user.save();
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
