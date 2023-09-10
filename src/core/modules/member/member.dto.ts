import { IsNotEmpty, IsInt } from 'class-validator';

export class MemberDTO {
  @IsNotEmpty()
  readonly teamId: number;

  @IsNotEmpty()
  readonly userId: number;

  memberId: number;


  // Kolom-kolom tambahan seperti peran atau tanggal bergabung
}
