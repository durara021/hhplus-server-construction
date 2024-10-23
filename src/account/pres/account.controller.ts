import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ObjectMapper } from 'src/common/mapper/object-mapper';
import { AccountUsecase } from '../app/account.use-case';
import { AccountGetResponseDto, AccountPatchRequestDto, AccountPostResponseDto } from './dto';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccountCommand } from '../app/commands/account.request.command';

@ApiTags('계좌 API') 
@Controller('accounts')
export class AccountController {
  
  constructor(
    private readonly accountUsecase: AccountUsecase,
    private readonly objectMapper: ObjectMapper,
  ) {}


  @Patch('/:userId/points')
  @ApiOperation({ summary: '금액 충전' }) 
  @ApiParam({ name: 'userId', description: '유저 id' })
  @ApiBody({ description: '충전 금액' })
  @ApiCreatedResponse({
    description: '성공',
    type: AccountPostResponseDto,
  })
  charge(
    @Body() body: AccountPatchRequestDto,
  ): Promise<AccountPostResponseDto> {
    return this.accountUsecase.charge(this.objectMapper.mapObject(body, AccountCommand));
  }

  @Get('/:userId/points')
  @ApiOperation({ summary: '포인트 조회' })
  @ApiParam({ name: 'userId', description: '유저 id' })
  @ApiCreatedResponse({
    description: '성공',
    type: AccountGetResponseDto,
  })
  point(
    @Body() body: AccountPatchRequestDto,
  ): Promise<AccountGetResponseDto> {
    return this.accountUsecase.point(this.objectMapper.mapObject(body, AccountCommand));
  }

}
