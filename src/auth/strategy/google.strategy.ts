import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONSTANTS } from 'src/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, CONSTANTS.GOOGLE_STRATEGY) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      clientID: config.get(CONSTANTS.GOOGLE_CLIENT_ID),
      clientSecret: config.get(CONSTANTS.GOOGLE_CLIENT_SECRET),
      callbackURL: 'http://localhost:3000/auth/google-redirect',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    //left uncomplete due to need to create a google account for certain emails in order to test
    done(null, user);
  }
}