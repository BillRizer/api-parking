import { HttpException, Injectable } from '@nestjs/common';
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

  async create(createCompanyDto: CreateCompanyDto) {
    try {
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
      return false;
    }
  }

  async findByEmail(email: string): Promise<Company | null> {
    const user = await this.companyRepository.findOneBy({ email: email });
    if (user) {
      return user;
    }
    return null;
  }

  findAll() {
    return `This action returns all company`;
  }

  async findOne(id: string) {
    return await this.companyRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
