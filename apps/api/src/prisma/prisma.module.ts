import {
  PrismaModule as NestPrismaModule,
  PrismaService,
  loggingMiddleware,
  providePrismaClientExceptionFilter,
} from "nestjs-prisma";

import { Logger, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Config } from "~/config/schema";

@Module({
  imports: [
    NestPrismaModule.forRootAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Config>) => ({
        prismaOptions: { datasourceUrl: configService.get("DATABASE_URL") },
        middlewares: [
          loggingMiddleware({
            logger: new Logger(PrismaService.name),
            logLevel: "debug",
            logMessage: (query) =>
              `Query ${query.model}.${query.action} took ${query.executionTime}ms`,
          }),
        ],
      }),
    }),
  ],
  providers: [providePrismaClientExceptionFilter()],
})
export class PrismaModule {}
