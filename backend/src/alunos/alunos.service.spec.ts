/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AlunosService } from './alunos.service';
import { PrismaService } from '../../prisma/prisma.service';
import { LogsService } from 'src/logs/logs.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

describe('AlunosService', () => {
  let service: AlunosService;
  let prismaService: PrismaService;
  let logsService: LogsService;

  const mockPrismaService = {
    aluno: {
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
        AlunosService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: LogsService, useValue: mockLogsService },
      ],
    }).compile();

    service = module.get<AlunosService>(AlunosService);
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
    it('should return a list of students', async () => {
      const alunosMock = [{ id: 1, nome: 'João' }, { id: 2, nome: 'Maria' }];
      (prismaService.aluno.findMany as jest.Mock).mockResolvedValue(alunosMock);
      (prismaService.aluno.count as jest.Mock).mockResolvedValue(alunosMock.length);
      (prismaService.$transaction as jest.Mock).mockResolvedValue([alunosMock.length, alunosMock]);

      const result = await service.findAll({} as any);

      expect(prismaService.aluno.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        alunos: alunosMock,
        total: alunosMock.length,
        page: 1,
        limit: 10,
        totalPages: Math.ceil(alunosMock.length / 10),
      });
    });
  });

  describe('findOne', () => {
    it('should return one student by ID', async () => {
      const alunoMock = { id: 1, nome: 'João' };
      (prismaService.aluno.findUnique as jest.Mock).mockResolvedValue(alunoMock);

      const result = await service.findOne(1);

      expect(prismaService.aluno.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(alunoMock);
    });

    it('should return null if student not found', async () => {
      (prismaService.aluno.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.findOne(99);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a student and log success', async () => {
      const dto: CreateAlunoDto = { nome: 'Novo Aluno', email: 'novo@aluno.com' };
      const alunoMock = { id: 3, ...dto };
      (prismaService.aluno.create as jest.Mock).mockResolvedValue(alunoMock);

      const result = await service.create(dto);

      expect(prismaService.aluno.create).toHaveBeenCalledWith({ data: dto });
      expect(logsService.create).toHaveBeenCalledWith(
        `Aluno criado: ID ${alunoMock.id}, Nome: ${alunoMock.nome}`,
        'AlunosService.create',
      );
      expect(result).toEqual(alunoMock);
    });
  });

  describe('update', () => {
    it('should update a student and log success', async () => {
      const dto: UpdateAlunoDto = { nome: 'Atualizado' };
      const alunoMock = { id: 1, nome: 'Atualizado', email: 'teste@teste.com' };
      (prismaService.aluno.update as jest.Mock).mockResolvedValue(alunoMock);

      const result = await service.update(1, dto);

      expect(prismaService.aluno.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
      expect(logsService.create).toHaveBeenCalledWith(
        `Aluno atualizado: ID ${alunoMock.id}, Nome: ${alunoMock.nome}`,
        'AlunosService.update',
      );
      expect(result).toEqual(alunoMock);
    });
  });

  describe('remove', () => {
    it('should delete a student and log success', async () => {
      const alunoMock = { id: 1, nome: 'Apagar', email: 'teste@teste.com' };
      (prismaService.aluno.delete as jest.Mock).mockResolvedValue(alunoMock);

      const result = await service.remove(1);

      expect(prismaService.aluno.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(logsService.create).toHaveBeenCalledWith(
        `Aluno removido: ID ${alunoMock.id}, Nome: ${alunoMock.nome}`,
        'AlunosService.remove',
      );
      expect(result).toEqual(alunoMock);
    });
  });
});
