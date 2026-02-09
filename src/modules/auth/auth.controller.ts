import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class TokenRequestDto {
  username!: string;
  password!: string;
}

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Issue JWT token' })
  @ApiBody({
    type: TokenRequestDto,
    examples: {
      credentials: {
        summary: 'Username/password',
        value: { username: 'your-username', password: 'your-password' },
      },
    },
  })
  @ApiOkResponse({
    description: 'JWT issued successfully',
    schema: { example: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } },
  })
  @Post('token')
  async token(@Body() body: TokenRequestDto) {
    const username = body?.username?.trim();
    const password = body?.password;

    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    try {
      const token = await this.authService.generateToken(username);
      return { token };
    } catch (error: any) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      if (error instanceof InternalServerErrorException) {
        throw error;
      }

      throw new InternalServerErrorException('Authentication failed');
    }
  }
}
