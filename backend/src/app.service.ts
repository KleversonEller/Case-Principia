import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Documentação Swagger disponível em: <a href="http://localhost:3001/api/docs" rel="noopener noreferrer">http://localhost:3001/api/docs</a>`;
  }
}
