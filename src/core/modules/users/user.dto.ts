import { IsNotEmpty, IsEmail, MinLength, Equals } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'NIP tidak boleh kosong' })
  @MinLength(15, { message: 'NIP harus memiliki setidaknya 15 karakter' })
  readonly nip: number;

  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  readonly name: string;

  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  readonly email: string;

  @IsNotEmpty({ message: 'Nomor HP tidak boleh kosong' })
  @MinLength(12, { message: 'Nomor HP harus memiliki setidaknya 12 karakter' })
  readonly nohp: number;

  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @MinLength(6, { message: 'Password harus memiliki setidaknya 6 karakter' })
   password: string;

   role?: UserRole;
}

export enum UserRole {
  SUPERADMIN = 'Super Admin',
  ADMIN = 'Admin',
  USER = 'User',
}
