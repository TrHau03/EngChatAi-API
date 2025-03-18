import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
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
      const verify = await this.authService.verifyToken(token);
    } catch (error) {
      console.log(error);

      throw Exception.HTTPException(
        ErrorType.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
