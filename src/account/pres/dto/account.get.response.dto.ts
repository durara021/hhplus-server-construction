import { ApiProperty } from "@nestjs/swagger";

export class AccountGetResponseDto {
    @ApiProperty({ description: '계좌 소유자' })
    userId: number;

    @ApiProperty({ description: '총액' })
    balance: number; // 총액
} 
