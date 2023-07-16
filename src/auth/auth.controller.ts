import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleDto, ManualDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { CONSTANTS } from 'src/common';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('manual-login')
  @HttpCode(HttpStatus.OK)
  manualLogin(@Body() dto: ManualDto) {
    return this.authService.manualLogin(dto);
  }

  @UseGuards(AuthGuard(CONSTANTS.GOOGLE_STRATEGY))
  @Post('google-login')
  @HttpCode(HttpStatus.OK)
  googleLogin(@Body() dto: GoogleDto) {
    return this.authService.googleLogin(dto);
  }

  @Post('register')
  register(@Body() dto: ManualDto) {
    return this.authService.register(dto);
  }
}
