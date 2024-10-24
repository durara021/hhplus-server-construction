import { Injectable, Logger } from '@nestjs/common';
import { CustomLogger } from '../logger/custom.logger';
@Injectable()
export class ObjectMapper {

  constructor(
    private readonly logger: CustomLogger
  ) {}

  // 객체 변환 로직
  mapObject<T extends Record<string, any>, U>(source: T, targetClass: new () => U): U {
    const targetInstance = new targetClass();

    // 호출한 클래스와 메서드 정보를 가져옴
    this.logger.getCallerInfo();

    this.logger.debug('Start mapping');

    for (const key in targetInstance) {
      const sourceValue = source[key as keyof T];
      const targetValue = targetInstance[key as keyof U];
      if (key in source && typeof sourceValue === typeof targetValue) {
        targetInstance[key as keyof U] = sourceValue as any;
      } else if (key in source && typeof sourceValue !== typeof targetValue) {
        targetInstance[key as keyof U] = this.customTransform(sourceValue, targetValue);
      }
    }

    this.logger.debug('Mapping completed');

    return targetInstance;
  }

  // 객체(배열) 변환
  mapArray<T extends Record<string, any>, U>(sourceArray: T[], targetClass: new () => U): U[] {
    return sourceArray.map(source => this.mapObject(source, targetClass));
  }

  // 커스텀 타입 변환 로직
  private customTransform(sourceValue: any, targetValue: any): any {
    this.logger.debug(`Performing custom transform from ${typeof sourceValue} to ${typeof targetValue}`);

    if (typeof targetValue === 'number') {
      // 문자열을 숫자로 변환
      return parseInt(sourceValue);
    } else if (typeof targetValue === 'string') {
      // 숫자를 문자열로 변환
      return sourceValue.toString();
    } else if (targetValue instanceof Date) {
      // 문자열을 Date 객체로 변환
      return new Date(sourceValue);
    }
    // 타입 변환이 정의되지 않은 경우 그대로 반환
    return sourceValue;
  }
}
