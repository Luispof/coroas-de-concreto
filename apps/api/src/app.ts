import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule, type AppOptions } from './app.module.js';

export async function createApp(options: AppOptions = {}) {
  const app = await NestFactory.create(AppModule.register(options), { abortOnError: false });
  app.setGlobalPrefix('api/v1');
  app.enableShutdownHooks();
  return app;
}
