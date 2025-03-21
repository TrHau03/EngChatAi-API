import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GatewayTimeoutException,
  GoneException,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  PayloadTooLargeException,
  RequestTimeoutException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';

export enum ErrorType {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  FORBIDDEN = 'FORBIDDEN',
  CONFLICT = 'CONFLICT',
  NOT_ACCEPTABLE = 'NOT_ACCEPTABLE',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  GONE = 'GONE',
  PAYLOAD_TOO_LARGE = 'PAYLOAD_TOO_LARGE',
  INTERNAL_SERVER = 'INTERNAL_SERVER',
  BAD_GATEWAY = 'BAD_GATEWAY',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
  
}

export enum ErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  CONFLICT = 409,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
  GONE = 410,
  PAYLOAD_TOO_LARGE = 413,
  INTERNAL_SERVER = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  CLIENT_CLOSED_REQUEST = 499,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
  NETWORK_CONNECT_TIMEOUT_ERROR = 599,
}

export class Exception {
  static HTTPException(type: ErrorType, message: ErrorCode) {
    switch (type) {
      case ErrorType.BAD_REQUEST:
        throw new BadRequestException(message);
      case ErrorType.UNAUTHORIZED:
        throw new UnauthorizedException(message);
      case ErrorType.NOT_FOUND:
        throw new NotFoundException(message);
      case ErrorType.FORBIDDEN:
        throw new ForbiddenException(message);
      case ErrorType.CONFLICT:
        throw new ConflictException(message);
      case ErrorType.NOT_ACCEPTABLE:
        throw new NotAcceptableException(message);
      case ErrorType.REQUEST_TIMEOUT:
        throw new RequestTimeoutException(message);
      case ErrorType.GONE:
        throw new GoneException(message);
      case ErrorType.PAYLOAD_TOO_LARGE:
        throw new PayloadTooLargeException(message);
      case ErrorType.INTERNAL_SERVER:
        throw new InternalServerErrorException(message);
      case ErrorType.BAD_GATEWAY:
        throw new BadGatewayException(message);
      case ErrorType.SERVICE_UNAVAILABLE:
        throw new ServiceUnavailableException(message);
      case ErrorType.GATEWAY_TIMEOUT:
        throw new GatewayTimeoutException(message);
      default:
        throw new BadRequestException(message);
    }
  }
}
