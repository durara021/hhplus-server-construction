import { ApiProperty } from "@nestjs/swagger";

export class SessionPostResponseDto {
    @ApiProperty({ description: 'uuid' })
    uuid: string;
    @ApiProperty({ description: '유저id' })
    userId: number;
    @ApiProperty({ description: '등록일' })
    regDate: Date;

    constructor(
        uuid: string,
        userId: number,
        regDate: Date,
    ) {
        this.uuid = uuid;
        this.userId = userId;
        this.regDate = regDate;
    }
}
