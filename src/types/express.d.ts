import { User } from '../generated/prisma/models.js';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
