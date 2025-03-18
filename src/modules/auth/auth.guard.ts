import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { Reflector } from '@nestjs/core';
  import { config } from 'src/config';
  import { IS_PUBLIC_KEY } from '../../decorator/public.decorator';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
      if (isPublic) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest<Request & { user?: any }>();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }
  
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: config.JWT_SECRET,
        });
  
        request.user = payload;
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
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
  