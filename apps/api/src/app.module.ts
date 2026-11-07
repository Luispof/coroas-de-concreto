import { Module, type DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller.js';
import { validateEnvironment } from './config/environment.js';

export interface AppOptions {
  ignoreEnvFile?: boolean;
  envFilePath?: string;
}

@Module({
  controllers: [HealthController],
})
export class AppModule {
  static register(options: AppOptions = {}): DynamicModule {
    return {
      module: AppModule,
      imports: [ConfigModule.forRoot({
        envFilePath: options.envFilePath ?? '.env',
        ignoreEnvFile: options.ignoreEnvFile ?? false,
        validate: validateEnvironment,
      })],
    };
  }
}
