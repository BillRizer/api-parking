import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/entities/company.entity';
import { EncryptService } from '../encrypt/encrypt.service';
import { IJwtBody, IJwtResponse } from './interface/jwt-response.interface';

export type User = any;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private companyService: CompanyService,
    private readonly encrypt: EncryptService,
  ) {}

  async validateUser(
    email: string,
    plainTextPass: string,
  ): Promise<Company | null> {
    const company: Company = await this.companyService.findByEmail(email);
    if (!company) {
      return null;
    }
    const isPasswordValid = await this.verifyPassword(
      plainTextPass,
      company.password,
    );
    if (isPasswordValid === false) {
      return null;
    }
    return company;
  }

  async generateJwtAuth(company: Company): Promise<IJwtResponse> {
    const payload: IJwtBody = { companyId: company.id };
    return {
      jwt: this.jwtService.sign(payload),
    };
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await this.encrypt.compareHash(plainTextPassword, hashedPassword);
  }
}
