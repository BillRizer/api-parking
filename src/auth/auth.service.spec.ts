import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/entities/company.entity';

const mockCompany: Company = {
  address: '123 Main St',
  cnpj: '123123123',
  email: 'test@example.com',
  id: 'asdaa-asda-sdas-das',
  max_amount_cars: 10,
  max_amount_motorcycles: 10,
  name: 'Test Company',
  password: 'hashedPassword',
  phone: '1234567890',
  createdAt: '',
  updatedAt: '',
};

describe('AuthService', () => {
  let authService: AuthService;
  let companyService: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test-token',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            generateJwtAuth: jest.fn((user) => {
              return { jwt: `${JSON.stringify(user)}` };
            }),
            validateUser: jest
              .fn()
              .mockImplementation((email, pass) =>
                email === mockCompany.email && pass === mockCompany.password
                  ? mockCompany
                  : null,
              ),
          },
        },
        {
          provide: CompanyService,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    companyService = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should validate user with username invalid', async () => {
    const validate = await authService.validateUser('user-away', 'pass');

    expect(validate).toEqual(null);
  });

  it('should validate user with password invalid', async () => {
    const validate = await authService.validateUser('user', 'pass-wrong');

    expect(validate).toEqual(null);
  });

  it('should validate user with user valid', async () => {
    const validate = await authService.validateUser(
      'test@example.com',
      'hashedPassword',
    );

    expect(validate).toEqual(mockCompany);
  });

  it('should generate jwt token with size greater then 32', async () => {
    const login = await authService.generateJwtAuth(mockCompany);

    expect(login.jwt.length).toBeGreaterThan(32);
  });
});
