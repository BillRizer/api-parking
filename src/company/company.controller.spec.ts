import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mockCompany } from '../utils/mocks/company';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

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
            create: jest.fn((newCompany) => {
              return new Company(newCompany);
            }),
            findOne: jest.fn(),
            findByEmail: jest.fn(),
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
});
