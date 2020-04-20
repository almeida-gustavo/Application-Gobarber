import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAutehnticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    // Vc esta forcando o tipo do decoded como TokenPayload que vc criou, porque se nao fizer dessa forma o TS vai dar erro... Sempre que vc precisar forcar o tipo de uma variavel vc pode fazer isso
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
