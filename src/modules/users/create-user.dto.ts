import { IsString } from 'class-validator';

export class SignIndDTO {
  @IsString()
  idToken: string;
}
