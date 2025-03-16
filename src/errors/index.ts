import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export enum ErrorType {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  FORBIDDEN = 'FORBIDDEN',
  CONFLICT = 'CONFLICT',
  NOT_ACCEPTABLE = 'NOT_ACCEPTABLE',
  TIMEOUT = 'TIMEOUT',
  GONE = 'GONE',
  PAYLOAD_TOO_LARGE = 'PAYLOAD_TOO_LARGE',
  INTERNAL_SERVER = 'INTERNAL_SERVER',
  BAD_GATEWAY = 'BAD_GATEWAY',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
}

export class Exception {
  static HTTPException(type: ErrorType, message: string) {
    switch (type) {
      case ErrorType.BAD_REQUEST:
        throw new BadRequestException(message);
      case ErrorType.UNAUTHORIZED:
        throw new UnauthorizedException(message);
      case ErrorType.NOT_FOUND:
        throw new BadRequestException(message);
      case ErrorType.FORBIDDEN:
        throw new BadRequestException(message);
      case ErrorType.CONFLICT:
        throw new BadRequestException(message);
      case ErrorType.NOT_ACCEPTABLE:
        throw new BadRequestException(message);
      case ErrorType.TIMEOUT:
        throw new BadRequestException(message);
      case ErrorType.GONE:
        throw new BadRequestException(message);
      case ErrorType.PAYLOAD_TOO_LARGE:
        throw new BadRequestException(message);
      case ErrorType.INTERNAL_SERVER:
        throw new BadRequestException(message);
      case ErrorType.BAD_GATEWAY:
        throw new BadRequestException(message);
      case ErrorType.SERVICE_UNAVAILABLE:
        throw new BadRequestException(message);
      case ErrorType.GATEWAY_TIMEOUT:
        throw new BadRequestException(message);
      default:
        throw new BadRequestException(message);
    }
  }
}
