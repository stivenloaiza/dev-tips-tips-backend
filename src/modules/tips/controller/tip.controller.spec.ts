import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose'; // Importar getModelToken para trabajar con modelos en pruebas
import { Model } from 'mongoose';
import { TipsController } from './tip.controller';
import { TipsService } from '../service/tips.service';
import { CreateTipDto } from '../dto/create-tip.dto';
import { TipGuard } from '../../../libs/guards/ForwardingTips/tip.guard';
import { UpdateTipDto } from '../dto/update-tip.dto';

// Mock de modelos
const mockUserTipModel = {
  findOne: jest.fn().mockResolvedValue(null),
  create: jest.fn().mockResolvedValue({}),
};

const mockUserModel = {
  findById: jest.fn().mockResolvedValue({}),
};

const mockTipModel = {
  findById: jest.fn().mockResolvedValue({}),
};



describe('TipsController', () => {
  let controller: TipsController;
  let service: TipsService;

  const mockTipsService = {
    create: jest.fn((dto: CreateTipDto) => Promise.resolve(dto)),
    findAll: jest.fn((filters: any) => Promise.resolve([])),
  findOne: jest.fn((id: string) => Promise.resolve({ id })),
  update: jest.fn((id: string, dto: UpdateTipDto) => Promise.resolve({ id, ...dto })),
  delete: jest.fn((id: string) => Promise.resolve({ message: 'Tip deleted successfully' })),
  };

  const mockTipGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipsController],
      providers: [
        {
          provide: TipsService,
          useValue: mockTipsService,
        },
        {
          provide: TipGuard,
          useValue: mockTipGuard,
        },
        {
          provide: getModelToken('UserTip'),
          useValue: mockUserTipModel,
        },
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken('Tip'),
          useValue: mockTipModel,
        },
      ],
    }).compile();

    controller = module.get<TipsController>(TipsController);
    service = module.get<TipsService>(TipsService);
  });

  describe('create', () => {
    it('should create a new tip', async () => {
      const createTipDto: CreateTipDto = {
        title: 'Getting Started with TypeScript',
        body: 'TypeScript is a strongly typed superset of JavaScript...',
        level: '60d9b45d8e3c8b001a3c3d6a',
        technology: '60d9b45d8e3c8b001a3c3d6b',
        lang: '60d9b45d8e3c8b001a3c3d6d',
      };

      const result = await controller.create(createTipDto);

      expect(result).toEqual(createTipDto);
      expect(service.create).toHaveBeenCalledWith(createTipDto);
    });

      describe('findAll', () => {
    it('should retrieve all tips with filters and pagination', async () => {
      const filters = { page: 1, limit: 10, title: 'Tips TypeScript' };
      const result = await controller.findAll(filters.page, filters.limit, filters.title, undefined, undefined, undefined, undefined);
      expect(result).toEqual([]);
      expect(mockTipsService.findAll).toHaveBeenCalledWith(filters);
    });
  });

  describe('findOne', () => {
    it('should retrieve a single tip by id', async () => {
      const id = '609c6c5b0e468c3c24cfe8a5';
      const result = await controller.findOne(id);
      expect(result).toEqual({ id });
      expect(mockTipsService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a tip by id', async () => {
      const id = '609c6c5b0e468c3c24cfe8a5';
      const updateTipDto: UpdateTipDto = { title: 'Updated Title' };
      const result = await controller.update(id, updateTipDto);
      expect(result).toEqual({ id, ...updateTipDto });
      expect(mockTipsService.update).toHaveBeenCalledWith(id, updateTipDto);
    });
  });

  describe('remove', () => {
    it('should delete a tip by id', async () => {
      const id = '609c6c5b0e468c3c24cfe8a5';
      const result = await controller.remove(id);
      expect(result).toEqual({ message: 'Tip deleted successfully' });
      expect(mockTipsService.delete).toHaveBeenCalledWith(id);
    });
  });
});
});