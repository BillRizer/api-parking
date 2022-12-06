import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { mockCompany } from '../utils/mocks/company';
import { EncryptService } from '../encrypt/encrypt.service';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

const companyData = {
  ...mockCompany,
};
const updatedCompanyData = {
  ...mockCompany,
  cnpj: '00000000',
  name: 'changed name',
};
const companyEntity = new Company(companyData);
const updatedCompanyEntity = new Company(updatedCompanyData);

describe('CompanyService', () => {
  let companyService: CompanyService;
  let encryptService: EncryptService;
  let companyRepository: Repository<Company>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useValue: {
            create: jest.fn(),
            save: jest.fn().mockResolvedValue(companyEntity),
            findOneBy: jest.fn().mockResolvedValue(companyEntity),
            findOne: jest.fn().mockResolvedValue(companyEntity),
            findOneOrFail: jest.fn().mockResolvedValue(companyEntity),
            merge: jest.fn().mockResolvedValue(updatedCompanyEntity),
          },
        },
        {
          provide: EncryptService,
          useValue: {
            encrypHash: jest.fn().mockResolvedValue('hashedPassword'),
          },
        },
      ],
    }).compile();

    companyService = module.get<CompanyService>(CompanyService);
    encryptService = module.get<EncryptService>(EncryptService);
    companyRepository = module.get<Repository<Company>>(
      getRepositoryToken(Company),
    );
  });

  it('should be defined', () => {
    expect(companyService).toBeDefined();
    expect(companyRepository).toBeDefined();
  });

  describe('findByEmail', () => {
    it('should find user By Email', async () => {
      const result = await companyService.findByEmail('exist@email.com');

      expect(result).toEqual(companyEntity);
      expect(companyRepository.findOneBy).toHaveBeenCalledTimes(1);
    });

    it('should return null when user not found', async () => {
      jest.spyOn(companyRepository, 'findOneBy').mockResolvedValueOnce(null);

      const result = await companyService.findByEmail('not-exist@email.com');

      expect(result).toEqual(null);
      expect(companyRepository.findOneBy).toHaveBeenCalledTimes(1);
    });
  });
  describe('create', () => {
    it('should create user', async () => {
      const newCompany: CreateCompanyDto = {
        ...companyData,
        email: 'new-email@email.com',
      };

      jest.spyOn(companyService, 'findByEmail').mockResolvedValueOnce(null);
      const created = await companyService.create(newCompany);

      expect(created).toEqual(companyEntity);
      expect(companyRepository.create).toHaveBeenCalledTimes(1);
      expect(encryptService.encrypHash).toHaveBeenCalledTimes(1);
      expect(companyRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should find user', async () => {
      const result = await companyService.findOne('uuid-fake');

      expect(result).toEqual(companyEntity);
    });

    it('should return null when not found user', async () => {
      jest.spyOn(companyService, 'findOne').mockResolvedValueOnce(null);

      const result = await companyService.findOne('uuid-fake');

      expect(result).toEqual(null);
    });
  });

  describe('Update', () => {
    it('should update user', async () => {
      const updateData: UpdateCompanyDto = {
        ...updatedCompanyData,
      };

      jest
        .spyOn(companyRepository, 'save')
        .mockResolvedValueOnce(updatedCompanyEntity);
      const updated = await companyService.update('fake-uuid', updateData);

      expect(updated).toEqual(updateData);
      expect(companyRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      jest.spyOn(companyRepository, 'save').mockRejectedValueOnce(new Error());

      expect(
        companyService.update('fake-uuid', updatedCompanyData),
      ).rejects.toThrowError();
    });
  });

  describe('Delete', () => {
    it('should delete user', async () => {
      const deleted = await companyService.delete('fake-uuid');

      expect(deleted).toEqual(true);
    });
  });
});
