import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private userRepository: UserRepository) {}

  async createUser(name: string, email: string, password: string, role?: string): Promise<User> {
    this.logger.log(`Creating user with name: ${name}, email: ${email}, role: ${role || 'employee'}`);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'employee', // Use provided role, default to 'employee' if undefined
    });
    const savedUser = await this.userRepository.save(user);
    this.logger.log(`User saved with ID: ${savedUser.id}, role: ${savedUser.role}`);
    return savedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}