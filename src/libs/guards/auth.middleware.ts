import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'API Key is missing here' });
    }

    try {
      const response = await axios.post(
        process.env.VALIDATE_KEY_URL,
        { key: apiKey },
        {
          headers: {
            'x-api-key': process.env.TISP_X_API_KEY,
          },
        },
      );
      if (response.data === true) {
        next();
      } else {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'Invalid API Key' });
      }
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Forbidden' });
    }
  }
}
