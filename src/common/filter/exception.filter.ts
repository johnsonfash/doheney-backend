import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception?.getStatus ? exception?.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const cause = exception?.cause ?? typeof exception?.meta?.target === 'object' ? exception?.meta?.target[0] : undefined;
    const message = typeof exception?.response?.message === 'object' ? exception?.response?.message[0] : exception?.response?.message ?? exception?.message
    response
      .status(status)
      .json({
        statusCode: status,
        status: false,
        message,
        data: null,
        cause,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}