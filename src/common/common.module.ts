// common.module.ts
import { Module } from '@nestjs/common';
import { AutoManagerRepository } from './utils/auto-manager.repository';

@Module({
  providers: [AutoManagerRepository],
  exports: [AutoManagerRepository],
})
export class CommonModule {}
