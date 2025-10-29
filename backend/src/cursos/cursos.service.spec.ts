/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { CursosService } from './cursos.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { LogsService } from 'src/logs/logs.service';

describe('CursosService', () => {
  let service: CursosService;
  let prismaService: PrismaService;
  let logsService: LogsService;

  const mockPrismaService = {
    curso: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const mockLogsService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CursosService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: LogsService, useValue: mockLogsService },
      ],
    }).compile();

    service = module.get<CursosService>(CursosService);
    prismaService = module.get<PrismaService>(PrismaService);
    logsService = module.get<LogsService>(LogsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of cursos', async () => {
      const cursosMock = [
        { id: 1, nome: 'Introdução ao NestJS', descricao: 'Curso básico de NestJS' },
        { id: 2, nome: 'Avançado em TypeScript', descricao: 'Curso avançado de TypeScript' },
      ];
      (prismaService.curso.findMany as jest.Mock).mockResolvedValue(cursosMock);
      (prismaService.curso.count as jest.Mock).mockResolvedValue(cursosMock.length);
      (prismaService.$transaction as jest.Mock).mockResolvedValue([cursosMock.length, cursosMock]);

      const result = await service.findAll({} as any);

      expect(prismaService.curso.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        cursos: cursosMock,
        total: cursosMock.length,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
    });
  });

  describe('findOne', () => {
    it('should return a curso by id', async () => {
      const cursoMock = { id: 1, nome: 'Introdução ao NestJS', descricao: 'Curso básico de NestJS' };
      (prismaService.curso.findUnique as jest.Mock).mockResolvedValue(cursoMock);

      const result = await service.findOne(1);

      expect(prismaService.curso.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(cursoMock);
    });

    it('should return null if curso not found', async () => {
      (prismaService.curso.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a curso and log sucess', async () => {
      const dto: CreateCursoDto = { nome: 'Introdução ao NestJS', descricao: 'Curso básico de NestJS' };
      const createdCursoMock = { id: 1, ...dto };
      (prismaService.curso.create as jest.Mock).mockResolvedValue(createdCursoMock);
      
      const result = await service.create(dto);

      expect(prismaService.curso.create).toHaveBeenCalledWith({ data: dto });
      expect(logsService.create).toHaveBeenCalledWith(
        `Curso criado: ID ${createdCursoMock.id}, Nome: ${createdCursoMock.nome}`,
        'CursosService.create',
      );
      expect(result).toEqual(createdCursoMock);
    });
  });

  describe('update', () => {
    it('should update a curso and log sucess', async () => {
      const dto: UpdateCursoDto = { nome: 'NestJS Avançado' };
      const updatedCursoMock = { id: 1, nome: 'NestJS Avançado', descricao: 'Curso básico de NestJS' };
      (prismaService.curso.update as jest.Mock).mockResolvedValue(updatedCursoMock);
      
      const result = await service.update(1, dto);

      expect(prismaService.curso.update).toHaveBeenCalledWith({ where: { id: 1 }, data: dto });
      expect(logsService.create).toHaveBeenCalledWith(
        `Curso atualizado: ID ${updatedCursoMock.id}, Nome: ${updatedCursoMock.nome}`,
        'CursosService.update',
      );
      expect(result).toEqual(updatedCursoMock);
    });
  });

  describe('remove', () => {
    it('should delete a curso and log sucess', async () => {
      const deletedCursoMock = { id: 1, nome: 'Introdução ao NestJS', descricao: 'Curso básico de NestJS' };
      (prismaService.curso.delete as jest.Mock).mockResolvedValue(deletedCursoMock);
      
      const result = await service.remove(1);

      expect(prismaService.curso.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(logsService.create).toHaveBeenCalledWith(
        `Curso removido: ID ${deletedCursoMock.id}, Nome: ${deletedCursoMock.nome}`,
        'CursosService.remove',
      );
      expect(result).toEqual(deletedCursoMock);
    });
  });
});
