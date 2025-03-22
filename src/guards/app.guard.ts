import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { config } from 'src/config';
import { ErrorCode, ErrorType, Exception } from 'src/errors';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw Exception.HTTPException(
        ErrorType.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED,
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.JWT_SECRET,
      });
      request['user'] = payload;
    } catch (error) {
      console.log({ error });
      throw Exception.HTTPException(
        ErrorType.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
