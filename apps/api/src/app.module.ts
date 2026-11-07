import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller.js';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' })],
  controllers: [HealthController],
})
export class AppModule {}
