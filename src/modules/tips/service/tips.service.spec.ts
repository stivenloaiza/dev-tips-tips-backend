import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { TipsService } from './tips.service';
import { Model } from 'mongoose';
import { Tip } from '../entities/tip.entity';
import { CreateTipDto } from '../dto/create-tip.dto';

describe('TipsService', () => {
  let service: TipsService;
  let levelModel: Model<any>;
  let technologyModel: Model<any>;
  let subtechnologyModel: Model<any>;
  let langModel: Model<any>;
  let tipModel: Model<Tip>;

  const mockLevelModel = {
    findById: jest.fn(),
  };

  const mockTechnologyModel = {
    findById: jest.fn(),
  };

  const mockSubtechnologyModel = {
    findById: jest.fn(),
  };

  const mockLangModel = {
    findById: jest.fn(),
  };

  const mockTipModel = {
    create: jest.fn().mockReturnThis(),
    save: jest.fn(),
    find: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    findById: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipsService,
        { provide: getModelToken('Level'), useValue: mockLevelModel },
        { provide: getModelToken('Technology'), useValue: mockTechnologyModel },
        { provide: getModelToken('Subtechnology'), useValue: mockSubtechnologyModel },
        { provide: getModelToken('Lang'), useValue: mockLangModel },
        { provide: getModelToken('Tip'), useValue: mockTipModel },
      ],
    }).compile();

    service = module.get<TipsService>(TipsService);
    levelModel = module.get<Model<any>>(getModelToken('Level'));
    technologyModel = module.get<Model<any>>(getModelToken('Technology'));
    subtechnologyModel = module.get<Model<any>>(getModelToken('Subtechnology'));
    langModel = module.get<Model<any>>(getModelToken('Lang'));
    tipModel = module.get<Model<Tip>>(getModelToken('Tip'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createTipDto: CreateTipDto = {
      multimedia_url: 'http://example.com',
      title: 'Example Title',
      body: 'Example Body',
      link: 'http://example.com/link',
      level: 'levelId',
      technology: 'technologyId',
      subtechnology: 'subtechnologyId',
      lang: 'langId',
      createdAt: new Date(),
      createBy: 'User',
      updatedAt: new Date(),
      updateBy: 'User',
      deletedAt: null,
      deleteBy: null,
    };

    it('should create a tip successfully', async () => {
      mockLevelModel.findById.mockResolvedValue({ name: 'Level Name' });
      mockTechnologyModel.findById.mockResolvedValue({ name: 'Technology Name' });
      mockSubtechnologyModel.findById.mockResolvedValue({ name: 'Subtechnology Name' });
      mockLangModel.findById.mockResolvedValue({ name: 'Lang Name' });
      mockTipModel.create.mockResolvedValue({ save: jest.fn().mockResolvedValue('createdTip') });

      const result = await service.create(createTipDto);

      expect(result).toBe('createdTip');
      expect(mockLevelModel.findById).toHaveBeenCalledWith('levelId');
      expect(mockTechnologyModel.findById).toHaveBeenCalledWith('technologyId');
      expect(mockSubtechnologyModel.findById).toHaveBeenCalledWith('subtechnologyId');
      expect(mockLangModel.findById).toHaveBeenCalledWith('langId');
      expect(mockTipModel.create).toHaveBeenCalledWith(expect.objectContaining({
        multimedia_url: createTipDto.multimedia_url,
        title: createTipDto.title,
        body: createTipDto.body,
        link: createTipDto.link,
        available: true,
        level: 'Level Name',
        technology: 'Technology Name',
        subtechnology: 'Subtechnology Name',
        lang: 'Lang Name',
        createdAt: createTipDto.createdAt,
        createBy: createTipDto.createBy,
        updatedAt: createTipDto.updatedAt,
        updateBy: createTipDto.updateBy,
        deletedAt: createTipDto.deletedAt,
        deleteBy: createTipDto.deleteBy,
      }));
    });

    it('should throw NotFoundException if level is not found', async () => {
      mockLevelModel.findById.mockResolvedValue(null);

      await expect(service.create(createTipDto)).rejects.toThrow(NotFoundException);
      expect(mockLevelModel.findById).toHaveBeenCalledWith('levelId');
    });

    it('should throw NotFoundException if technology is not found', async () => {
      mockLevelModel.findById.mockResolvedValue({ name: 'Level Name' });
      mockTechnologyModel.findById.mockResolvedValue(null);

      await expect(service.create(createTipDto)).rejects.toThrow(NotFoundException);
      expect(mockTechnologyModel.findById).toHaveBeenCalledWith('technologyId');
    });

    it('should throw NotFoundException if subtechnology is not found', async () => {
      mockLevelModel.findById.mockResolvedValue({ name: 'Level Name' });
      mockTechnologyModel.findById.mockResolvedValue({ name: 'Technology Name' });
      mockSubtechnologyModel.findById.mockResolvedValue(null);

      await expect(service.create(createTipDto)).rejects.toThrow(NotFoundException);
      expect(mockSubtechnologyModel.findById).toHaveBeenCalledWith('subtechnologyId');
    });

    it('should throw NotFoundException if lang is not found', async () => {
      mockLevelModel.findById.mockResolvedValue({ name: 'Level Name' });
      mockTechnologyModel.findById.mockResolvedValue({ name: 'Technology Name' });
      mockSubtechnologyModel.findById.mockResolvedValue({ name: 'Subtechnology Name' });
      mockLangModel.findById.mockResolvedValue(null);

      await expect(service.create(createTipDto)).rejects.toThrow(NotFoundException);
      expect(mockLangModel.findById).toHaveBeenCalledWith('langId');
    });
  });

  describe('findAll', () => {
    it('should return an array of tips based on filters', async () => {
      const filters = {
        level: 'level1',
        technology: 'tech1',
        subtechnology: 'subtech1',
        lang: 'lang1',
        limit: '5',
        page: '2',
      };

      const tips = [
        { title: 'Tip 1' },
        { title: 'Tip 2' },
      ];

      mockTipModel.exec.mockResolvedValue(tips);

      const result = await service.findAll(filters);

      expect(result).toEqual(tips);
      expect(mockTipModel.find).toHaveBeenCalledWith({
        level: 'level1',
        technology: 'tech1',
        subtechnology: 'subtech1',
        lang: 'lang1',
      });
      expect(mockTipModel.skip).toHaveBeenCalledWith(5);
      expect(mockTipModel.limit).toHaveBeenCalledWith(5);
      expect(mockTipModel.exec).toHaveBeenCalled();
    });

    it('should return an array of tips with default pagination if filters are not provided', async () => {
      const filters = {};
      const tips = [
        { title: 'Tip 1' },
        { title: 'Tip 2' },
      ];

      mockTipModel.exec.mockResolvedValue(tips);

      const result = await service.findAll(filters);

      expect(result).toEqual(tips);
      expect(mockTipModel.find).toHaveBeenCalledWith({});
      expect(mockTipModel.skip).toHaveBeenCalledWith(0);
      expect(mockTipModel.limit).toHaveBeenCalledWith(10);
      expect(mockTipModel.exec).toHaveBeenCalled();
    });

    it('should handle invalid limit and page values', async () => {
      const filters = {
        limit: 'invalid',
        page: 'invalid',
      };
      const tips = [
        { title: 'Tip 1' },
        { title: 'Tip 2' },
      ];

      mockTipModel.exec.mockResolvedValue(tips);

      const result = await service.findAll(filters);

      expect(result).toEqual(tips);
      expect(mockTipModel.find).toHaveBeenCalledWith({});
      expect(mockTipModel.skip).toHaveBeenCalledWith(0);
      expect(mockTipModel.limit).toHaveBeenCalledWith(10);
      expect(mockTipModel.exec).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a tip if it exists', async () => {
      const tip = { title: 'Tip 1' };
      mockTipModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(tip),
      });

      const result = await service.findOne('validId');

      expect(result).toEqual(tip);
      expect(mockTipModel.findById).toHaveBeenCalledWith('validId');
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      mockTipModel.findById.mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('Database error')),
      });

      await expect(service.findOne('errorId')).rejects.toThrow(InternalServerErrorException);
      expect(mockTipModel.findById).toHaveBeenCalledWith('errorId');
    });
  });

  describe('delete', () => {
    it('should mark a tip as deleted if it exists', async () => {
      const tip = { save: jest.fn(), deletedAt: null as Date | null };
      mockTipModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(tip),
      });

      await service.delete('validId');

      expect(tip.deletedAt).toBeDefined();
      expect(tip.save).toHaveBeenCalled();
      expect(mockTipModel.findById).toHaveBeenCalledWith('validId');
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      mockTipModel.findById.mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('Database error')),
      });

      await expect(service.delete('errorId')).rejects.toThrow(InternalServerErrorException);
      expect(mockTipModel.findById).toHaveBeenCalledWith('errorId');
    });
  });
  
});