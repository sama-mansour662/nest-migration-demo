import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    if (process.env.NODE_ENV === 'test') {
      const req = context.switchToHttp().getRequest();
      req.user = { userId: 'test' };
      return true;
    }

    return super.canActivate(context);
  }
}
