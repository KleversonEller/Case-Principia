/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';
import { NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

describe('AlunosController', () => {
  let controller: AlunosController;
  let service: AlunosService;

  const mockAluno = { id: 1, nome: 'João', email: 'joao@email.com' };

  const mockAlunosService = {
    create: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
    findAll: jest.fn().mockResolvedValue([mockAluno]),
    findOne: jest.fn().mockImplementation((id) => id === 1 ? mockAluno : null),
    update: jest.fn().mockImplementation((id, dto) => id === 1 ? { ...mockAluno, ...dto } : null),
    remove: jest.fn().mockImplementation((id) => id === 1 ? true : (() => { throw new Error(); })()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunosController],
      providers: [
        {
          provide: AlunosService,
          useValue: mockAlunosService,
        },
      ],
    }).compile();

    controller = module.get<AlunosController>(AlunosController);
    service = module.get<AlunosService>(AlunosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new aluno', async () => {
      const dto: CreateAlunoDto = { nome: 'João', email: 'joao@email.com' };
      const result = await controller.create(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of alunos', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockAluno]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a aluno if found', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockAluno);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if aluno not found', async () => {
      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an existing aluno', async () => {
      const dto: UpdateAlunoDto = { nome: 'João Atualizado' };
      const result = await controller.update('1', dto);
      expect(result).toEqual({ ...mockAluno, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    it('should throw NotFoundException if aluno not found', async () => {
      const dto: UpdateAlunoDto = { nome: 'Não existe' };
      await expect(controller.update('999', dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a aluno successfully', async () => {
      await expect(controller.remove('1')).resolves.toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if aluno not found', async () => {
      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
