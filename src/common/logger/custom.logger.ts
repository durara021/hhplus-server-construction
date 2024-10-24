import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class CustomLogger implements LoggerService {
  private readonly logFilePath = 'app.log'; // 로그를 기록할 파일 경로

  log(message: string) {
    const { className, methodName } = this.getCallerInfo();
    this.writeLog('INFO', message, className, methodName);
  }

  error(message: string, trace?: string) {
    const { className, methodName } = this.getCallerInfo();
    this.writeLog('ERROR', `${message} - Trace: ${trace}`, className, methodName);
  }

  warn(message: string) {
    const { className, methodName } = this.getCallerInfo();
    this.writeLog('WARN', message, className, methodName);
  }

  debug(message: string) {
    const { className, methodName } = this.getCallerInfo();
    this.writeLog('DEBUG', message, className, methodName);
  }

  verbose(message: string) {
    const { className, methodName } = this.getCallerInfo();
    this.writeLog('VERBOSE', message, className, methodName);
  }

  private writeLog(level: string, message: string, className: string, methodName: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level}] [${className}] [${methodName}]: ${message}`;
    
    // 콘솔 출력
    console.log(logMessage);

    // 파일에 로그 저장
    fs.appendFileSync(this.logFilePath, logMessage + '\n');
  }

  // 스택 트레이스를 통해 호출자 정보 추출
  getCallerInfo(): { className: string, methodName: string } {
    const stack = new Error().stack;
    const callerLine = stack.split('\n')[3]; // 스택에서 3번째 라인을 추출 (호출자 정보)
    const match = callerLine.match(/at (.+?) \((.+?):(\d+):(\d+)\)/);
    const fullMethod = match ? match[1] : 'Unknown Method';
    const className = fullMethod.split('.')[0];
    const methodName = fullMethod.split('.')[1];

    return { className, methodName };
  }
}
