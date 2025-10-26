import { Controller, Post, Body } from '@nestjs/common';
import { LogsService } from './logs.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController() // Exclui este controlador da documentação Swagger
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  create(
    @Body('descricao') descricao: string,
    @Body('contexto') contexto?: string,
  ) {
    return this.logsService.create(descricao, contexto);
  }
}
