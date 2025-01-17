/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

import { repl } from '@nestjs/core';

import { MainModule } from './main.module';

async function bootstrap() {
  await repl(MainModule);
}
bootstrap();
