import { ApiProperty } from "@nestjs/swagger";

export class QueueGetResponseDto {
    @ApiProperty({ description: '대기열 순번' })
    position: number;
    @ApiProperty({ description: '상태' })
    status: string;
}
