import { IsNotEmpty, IsInt } from 'class-validator';

export class MemberDTO {
  
  readonly teamId: number;

  
  readonly userId: number;

  memberId: number;


  // Kolom-kolom tambahan seperti peran atau tanggal bergabung
}
