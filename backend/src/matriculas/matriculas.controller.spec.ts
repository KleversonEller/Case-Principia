/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { MatriculasController } from './matriculas.controller';
import { MatriculasService } from './matriculas.service';
import { NotFoundException } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';

describe('MatriculasController', () => {
  let controller: MatriculasController;
  let service: MatriculasService;

  const mockMatricula = { id: 1, alunoId: 1, cursoId: 1, situacao: 'ativa', status: 'confirmada' };

  const mockMatriculasService = {
    create: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
    findAll: jest.fn().mockResolvedValue([mockMatricula]),
    findOne: jest.fn().mockImplementation((id) => id === 1 ? mockMatricula : null),
    update: jest.fn().mockImplementation((id, dto) => id === 1 ? { ...mockMatricula, ...dto } : null),
    remove: jest.fn().mockImplementation((id) => id === 1 ? true : (() => { throw new Error(); })()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatriculasController],
      providers: [
        MatriculasService,
        {
          provide: MatriculasService,
          useValue: mockMatriculasService,
        },
      ],
    }).compile();

    controller = module.get<MatriculasController>(MatriculasController);
    service = module.get<MatriculasService>(MatriculasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new matricula', async () => {
      const dto: CreateMatriculaDto = { alunoId: 1, cursoId: 1, situacao: 'ativa', status: 'confirmada' };
      const result = await controller.create(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of matriculas', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockMatricula]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a matricula if found', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockMatricula);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if matricula not found', async () => {
      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an existing matricula', async () => {
      const dto: UpdateMatriculaDto = { situacao: 'inativa' };
      const result = await controller.update('1', dto);
      expect(result).toEqual({ ...mockMatricula, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    it('should throw NotFoundException if matricula to update not found', async () => {
      const dto: UpdateMatriculaDto = { situacao: 'inativa' };
      await expect(controller.update('999', dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a matricula successfully', async () => {
      await expect(controller.remove('1')).resolves.toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if matricula to remove not found', async () => {
      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
