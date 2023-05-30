import type { INestApplication } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';

export function middleware(app: INestApplication): INestApplication {
  //app.use(helmet());
  //app.use(compression());
  return app;
}
