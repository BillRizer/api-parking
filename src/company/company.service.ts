import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptService } from '../encrypt/encrypt.service';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private encrypt: EncryptService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company | null> {
    try {
      if (await this.findByEmail(createCompanyDto.email)) {
        throw new Error('Email address already exists.');
      }
      const hashedPassword = await this.encrypt.encrypHash(
        createCompanyDto.password,
      );

      const created = await this.companyRepository.create({
        ...createCompanyDto,
        password: hashedPassword,
      });
      return await this.companyRepository.save(created);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findByEmail(email: string): Promise<Company | null> {
    const user = await this.companyRepository.findOneBy({ email: email });
    if (user) {
      return user;
    }
    return null;
  }

  async findOne(id: string): Promise<Company | null> {
    return await this.companyRepository.findOne({ where: { id: id } });
  }

  async findOneOrFail(id: string): Promise<Company> {
    try {
      return await this.companyRepository.findOneOrFail({ where: { id: id } });
    } catch (error) {
      throw new NotFoundException('Could not find this company');
    }
  }

  async update(
    companyId: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.findOneOrFail(companyId);

    this.companyRepository.merge(company, updateCompanyDto);
    return await this.companyRepository.save(company);
  }

  async deleteById(companyId: string) {
    await this.findOneOrFail(companyId);
    await this.companyRepository.softDelete(companyId);
  }
}
