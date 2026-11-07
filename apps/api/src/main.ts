import { createApp } from './app.js';
import { ConfigService } from '@nestjs/config';

const app = await createApp();
await app.listen(app.get(ConfigService).getOrThrow<number>('PORT'), '127.0.0.1');
