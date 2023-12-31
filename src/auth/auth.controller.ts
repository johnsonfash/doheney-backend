import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleDto, ManualDto, RegisterDto } from './dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('manual-login')
  @HttpCode(HttpStatus.OK)
  manualLogin(@Body() dto: ManualDto) {
    return this.authService.manualLogin(dto);
  }

  @Post('google-login')
  @HttpCode(HttpStatus.OK)
  googleLogin(@Body() dto: GoogleDto) {
    return this.authService.googleLogin(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
