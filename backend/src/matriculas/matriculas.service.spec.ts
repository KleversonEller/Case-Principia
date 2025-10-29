/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { MatriculasService } from './matriculas.service';
import { PrismaService } from '../../prisma/prisma.service';
import { LogsService } from 'src/logs/logs.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';

describe('MatriculasService', () => {
  let service: MatriculasService;
  let prismaService: PrismaService;
  let logsService: LogsService;

  const mockPrismaService = {
    matricula: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockLogsService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatriculasService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: LogsService, useValue: mockLogsService },
      ],
    }).compile();

    service = module.get<MatriculasService>(MatriculasService);
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
    it('should return a list of matriculas', async () => {
      const matriculasMock = [
        { id: 1, alunoId: 1, cursoId: 1, situacao: 'ativa', status: 'cursando' },
        { id: 2, alunoId: 2, cursoId: 1, situacao: 'inativa', status: 'trancada' }
      ];
      (prismaService.matricula.findMany as jest.Mock).mockResolvedValue(matriculasMock);

      const result = await service.findAll();

      expect(prismaService.matricula.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(matriculasMock);
    });
  });

  describe('findOne', () => {
    it('should return one matricula by ID', async () => {
      const matriculaMock = { id: 1, alunoId: 1, cursoId: 1, situacao: 'ativa', status: 'cursando' };
      (prismaService.matricula.findUnique as jest.Mock).mockResolvedValue(matriculaMock);

      const result = await service.findOne(1);

      expect(prismaService.matricula.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(matriculaMock);
    });

    it('should return null if matricula not found', async () => {
      (prismaService.matricula.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a matricula and log success', async () => {
      const dto: CreateMatriculaDto = { alunoId: 1, cursoId: 1, situacao: 'ativa', status: 'cursando' };
      const matriculaMock = { id: 1, ...dto };
      (prismaService.matricula.create as jest.Mock).mockResolvedValue(matriculaMock);

      const result = await service.create(dto);

      expect(prismaService.matricula.create).toHaveBeenCalledWith({ data: dto });
      expect(logsService.create).toHaveBeenCalledWith(
        `Matrícula criada: ID ${matriculaMock.id}, AlunoID: ${matriculaMock.alunoId}, CursoID: ${matriculaMock.cursoId}`,
        'MatriculasService.create');
      expect(result).toEqual(matriculaMock);
    });
  });

  describe('update', () => {
    it('should update a matricula and log success', async () => {
      const dto: UpdateMatriculaDto = { situacao: 'inativa' };
      const matriculaMock = { id: 1, alunoId: 1, cursoId: 1, situacao: 'ativa', status: 'cursando' };
      (prismaService.matricula.update as jest.Mock).mockResolvedValue({ ...matriculaMock, ...dto });

      const result = await service.update(1, dto);

      expect(prismaService.matricula.update).toHaveBeenCalledWith({ where: { id: 1 }, data: dto });
      expect(logsService.create).toHaveBeenCalledWith(
        `Matrícula atualizada: ID ${matriculaMock.id}, AlunoID: ${matriculaMock.alunoId}, CursoID: ${matriculaMock.cursoId}`,
        'MatriculasService.update'
      );
      expect(result).toEqual({ ...matriculaMock, ...dto });
    });
  });

  describe('remove', () => {
    it('should delete a matricula and log success', async () => {
      const matriculaMock = { id: 1, alunoId: 1, cursoId: 1, situacao: 'ativa', status: 'cursando' };
      (prismaService.matricula.delete as jest.Mock).mockResolvedValue(matriculaMock);

      const result = await service.remove(1);

      expect(prismaService.matricula.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(logsService.create).toHaveBeenCalledWith(
        `Matrícula removida: ID ${matriculaMock.id}, AlunoID: ${matriculaMock.alunoId}, CursoID: ${matriculaMock.cursoId}`,
        'MatriculasService.remove'
      );
      expect(result).toEqual(matriculaMock);
    });
  });
});
