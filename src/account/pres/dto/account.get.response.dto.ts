import { ApiProperty } from "@nestjs/swagger";

export class AccountGetResponseDto {
    @ApiProperty({ description: '계좌 소유자' })
    userId: number;

    @ApiProperty({ description: '총액' })
    balance: number; // 총액

    constructor(
        userId: number,
        balance: number,
    ) {
        this.userId = userId;
        this.balance = balance;        
    }
} 
