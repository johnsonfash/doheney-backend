import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { CONSTANTS } from 'src/common';
import { GetUser } from './decorator';

@UseGuards(AuthGuard(CONSTANTS.JWT_STRATEGY))
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user
  }
}

