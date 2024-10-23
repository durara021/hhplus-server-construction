// common/common.module.ts
import { Module } from '@nestjs/common';
import { ObjectMapper } from './object-mapper';

@Module({
  providers: [ObjectMapper],
  exports: [ObjectMapper],  // 다른 모듈에서도 사용할 수 있도록 export
})
export class CommonModule {}
