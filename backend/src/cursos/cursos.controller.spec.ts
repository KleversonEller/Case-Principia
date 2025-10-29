/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { CursosController } from './cursos.controller';
import { CursosService } from './cursos.service';
import { NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

describe('CursosController', () => {
  let controller: CursosController;
  let service: CursosService;

  const mockCurso = { id: 1, nome: 'Introdução ao NestJS', descricao: 'Curso básico de NestJS' };

  const mockCursosService = {
    create: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
    findAll: jest.fn().mockResolvedValue([mockCurso]),
    findOne: jest.fn().mockImplementation((id) => id === 1 ? mockCurso : null),
    update: jest.fn().mockImplementation((id, dto) => id === 1 ? { ...mockCurso, ...dto } : null),
    remove: jest.fn().mockImplementation((id) => id === 1 ? true : (() => { throw new Error(); })()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CursosController],
      providers: [
        {
          provide: CursosService,
          useValue: mockCursosService,
        },
      ],
    }).compile();

    controller = module.get<CursosController>(CursosController);
    service = module.get<CursosService>(CursosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new curso', async () => {
      const dto: CreateCursoDto = { nome: 'Introdução ao NestJS', descricao: 'Curso básico de NestJS' };
      const result = await controller.create(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of cursos', async () => {
      const result = await controller.findAll({} as any);
      expect(result).toEqual([mockCurso]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a curso if found', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockCurso);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if curso not found', async () => {
      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an existing curso', async () => {
      const dto: UpdateCursoDto = { nome: 'NestJS Avançado' };
      const result = await controller.update('1', dto);
      expect(result).toEqual({ ...mockCurso, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    it('should throw NotFoundException if curso to update not found', async () => {
      const dto: UpdateCursoDto = { nome: 'NestJS Avançado' };
      await expect(controller.update('999', dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a curso successfully', async () => {
      await expect(controller.remove('1')).resolves.toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if curso to remove not found', async () => {
      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
