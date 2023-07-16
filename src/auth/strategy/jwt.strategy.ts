import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { CONSTANTS } from "../../common";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, CONSTANTS.JWT_STRATEGY) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get(CONSTANTS.JWT_SECRET),
    })
  }

  async validate({ email }: { email: string }) {
    const result = await this.prisma.user.findUnique({ where: { email } })
    const { hash, ...user } = result
    return user
  }
}