import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';

type TokenRequestBody = {
  username?: string;
  password?: string;
};

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  async token(@Body() body: TokenRequestBody) {
    const username = body?.username?.trim();
    const password = body?.password;

    if (!username || !password) {
      throw new BadRequestException('Invalid username or password');
    }

    // Expected to be a bcrypt hash (like your Express example).
    const hashedPassword = process.env.TOKEN_PASSWORD;
    const tokenUsername = process.env.TOKEN_USERNAME;

    if (!hashedPassword || !tokenUsername) {
      throw new InternalServerErrorException('TOKEN_USERNAME/TOKEN_PASSWORD not set');
    }

    const ok =
      username === tokenUsername && (await bcrypt.compare(password, hashedPassword));

    if (!ok) {
      throw new UnauthorizedException('Invalid username or password!');
    }

    const token = this.authService.generateToken(username);
    return { token };
  }
}

