import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { CONSTANTS } from 'src/common';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      errorFormat: 'minimal',
      datasources: {
        db: {
          url: config.get(CONSTANTS.DATABASE_URL),
        },
      },
    });
  }
}
