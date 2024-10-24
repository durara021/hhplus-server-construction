import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomLogger } from '../logger/custom.logger'; // CustomLogger 경로에 맞게 수정

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // 의도된 예외 (HttpException)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message;

      // 로그 기록
      this.logger.error(`[HTTP Exception] ${message}`, exception.stack);

      response.status(status).json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } 
    // 의도되지 않은 예외 (Error)
    else {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;

      // 로그 기록 (의도되지 않은 에러는 서버 내부에서 분석할 수 있도록 로그에 기록)
      this.logger.error('[Unexpected Error] ' + (exception as Error).message, (exception as Error).stack);

      response.status(status).json({
        statusCode: status,
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
