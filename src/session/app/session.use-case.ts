import { Injectable } from '@nestjs/common';
import { SessionPostResponseDto as ResPostDto } from "../pres/dto";
import { SessionService } from '../domain/session.service';
import { AbstractUserService } from '../../user/domain/service.interfaces/user.service.interface';

@Injectable()
export class SessionUsecase {

    constructor(
        private readonly sessionService: SessionService,
        private readonly userService: AbstractUserService,
    ) {}

    //세션 생성
    async create(userId: number): Promise<ResPostDto> {
        //아이디 확인
        const user = await this.userService.user(userId);
        //세션 생성
        const session = await this.sessionService.create(user.id);

        return new ResPostDto(session.uuid, session.userId, new Date(session.regDate));
    }

}
