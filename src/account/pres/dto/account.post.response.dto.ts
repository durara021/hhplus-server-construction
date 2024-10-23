import { ApiProperty } from "@nestjs/swagger";

export class AccountPostResponseDto {
    @ApiProperty({ description: '계좌 소유자' })
    userId: number;  // 계좌 소유자
    @ApiProperty({ description: '충전하는 point 양' })
    amount: number; // 충전하는 point 양
    @ApiProperty({ description: '충전/사용 구분' })
    stat: string; // 충전/사용 구분
    @ApiProperty({ description: '등록일' })
    regDate: Date; // 등록일
} 
