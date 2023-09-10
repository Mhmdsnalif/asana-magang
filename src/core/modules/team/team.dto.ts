import { IsNotEmpty, MinLength } from 'class-validator';

export class TeamDto {
    @IsNotEmpty()
    @MinLength(4)
    readonly namaTim: string;
}