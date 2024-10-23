// dto/account-charge-request.dto.ts
import { IsInt, IsPositive } from 'class-validator';

export class AccountPatchRequestDto {
  @IsInt()
  @IsPositive()
  userId: number;
}
