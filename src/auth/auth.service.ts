import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleDto, ManualDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

  async manualLogin(dto: ManualDto): Promise<{ access_token: string, user: Omit<User, 'hash'> }> {
    const result = await this.prisma.user.findFirst({ where: { email: dto.email } })
    if (!result) throw new NotFoundException('User not found')
    if (!await argon.verify(result.hash, dto.password)) throw new UnauthorizedException('Invalid password')
    const access_token = await this.signToken(result.id, result.email)
    const { hash, ...user } = result
    return { access_token, user }
  }

  async googleLogin(dto: GoogleDto): Promise<string> {
    return this.signToken(0, '')
  }

  async register(dto: ManualDto): Promise<boolean> {
    const hash = await argon.hash(dto.password)
    await this.prisma.user.create({ data: { email: dto.email, hash } })
    return true
  }

  async signToken(userID: number, email: string): Promise<string> {
    return await this.jwt.signAsync({ sub: userID, email }, { expiresIn: '60m', secret: this.config.get('JWT_SECRET') })
  }
}
