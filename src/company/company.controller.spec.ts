import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import RequestWithCompanty from 'src/auth/interface/request-with-company.interface';
import { mockCompany } from '../utils/mocks/company';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

const newCompanyData = {
  ...mockCompany,
};
const updatedCompanyData = {
  ...mockCompany,
  cnpj: '00000000',
  name: 'changed name',
};

const newCompanyEntity = new Company(newCompanyData);

const updatedCompanyEntity = new Company(updatedCompanyData);

describe('CompanyController', () => {
  let companyController: CompanyController;
  let companyService: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: {
            create: jest.fn().mockResolvedValue(newCompanyEntity),
            findOne: jest.fn().mockResolvedValue(newCompanyEntity),
            findByEmail: jest.fn(),
            update: jest.fn().mockResolvedValue(updatedCompanyEntity),
          },
        },
      ],
    }).compile();

    companyController = module.get<CompanyController>(CompanyController);
  });

  it('should be defined', () => {
    expect(companyController).toBeDefined();
  });

  describe('Create', () => {
    it('should create new user', async () => {
      const newCompany: CreateCompanyDto = {
        address: mockCompany.address,
        cnpj: mockCompany.cnpj,
        email: mockCompany.email,
        max_amount_cars: mockCompany.max_amount_cars,
        max_amount_motorcycles: mockCompany.max_amount_motorcycles,
        name: mockCompany.name,
        password: mockCompany.password,
        phone: mockCompany.phone,
      };
      const created: Company =
        (await companyController.create(newCompany)) || undefined;

      expect(created.email).toEqual(mockCompany.email);
      expect(created.cnpj).toEqual(mockCompany.cnpj);
    });
  });

  describe('getProfile', () => {
    it('should find user', async () => {
      const profile = await companyController.getProfile({
        user: { companyId: 'not-important-id' },
      } as RequestWithCompanty);

      expect(profile).toEqual(newCompanyEntity);
    });
  });

  describe('Update ', () => {
    it('should update user data', async () => {
      const newCompany: CreateCompanyDto = {
        ...updatedCompanyData,
      };
      const updated = await companyController.update(
        { user: { companyId: 'not-important-id' } } as RequestWithCompanty,
        newCompany,
      );

      expect(updated).not.toEqual(newCompanyData);
      expect(updated).toEqual(updated);
    });
  });
});
