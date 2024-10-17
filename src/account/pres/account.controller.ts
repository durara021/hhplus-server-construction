import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccountUsecase } from '../app/account.use-case';
import { AccountGetResponseDto, AccountPostResponseDto } from './dto';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
//import { UserValidationGuard } from '../../common/guard/user-validation.guard';

@ApiTags('계좌 API') 
@Controller('accounts')
export class AccountController {
  
  constructor(
    private readonly accountUsecase: AccountUsecase
  ) {}


  @Patch('/:userId/points')
  @ApiOperation({ summary: '금액 충전' }) 
  @ApiParam({ name: 'userId', description: '유저 id' })
  @ApiBody({ description: '충전 금액' })
  @ApiCreatedResponse({
    description: '성공',
    type: AccountPostResponseDto,
  })
  //@UseGuards(UserValidationGuard)
  charge(
    @Param('userId') userId: string,
    @Body('amount') amount: string,
  ): Promise<AccountPostResponseDto> {
    const chargeResult = this.accountUsecase.charge(parseInt(userId), parseInt(amount))
    return chargeResult;
    
  }

  @Get('/:userId/points')
  @ApiOperation({ summary: '포인트 조회' })
  @ApiParam({ name: 'userId', description: '유저 id' })
  @ApiCreatedResponse({
    description: '성공',
    type: AccountGetResponseDto,
  })
  //@UseGuards(UserValidationGuard)
  point(
    @Param('userId') userId: string,
  ): Promise<AccountGetResponseDto> {
    return this.accountUsecase.point(parseInt(userId));
  }

}
