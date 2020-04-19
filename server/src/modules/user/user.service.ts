import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { createUserDto, updatePasswordDto } from './user.dto';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
    async store(data: createUserDto) {
        const { username } = data;
        const user = await this.userRepository.findOne({ username })
        if (user) {
            throw new BadRequestException('用户已经存在了')
        }
        const entity = await this.userRepository.create(data)
        await this.userRepository.save(entity)
        return entity
    }
    async index() {
        const entities = await this.userRepository.find();
        return entities
    }
    async show(id: string) {
        const entity = await this.userRepository.findOne(id)
        if (!entity) {
            throw new NotFoundException('没找到用户')
        }
        return entity
    }
    async update(id: string, data: createUserDto) {
        const result = await this.userRepository.update(id, data)
        return result
    }
    async remove(id: string) {
        const entity = await this.userRepository.delete(id)
        return entity
    }
    async updatePassword(id: string, data: updatePasswordDto) {
        const { password, newPassword } = data
        const entity = await this.userRepository.findOne(id)
        if (!entity) {
            throw new NotFoundException('没找到用户')
        }
        const pass = await entity.comparePassword(password)
        if (!pass) {
            throw new BadRequestException('密码错误')
        }
        entity.password = newPassword
        await this.userRepository.save(entity)
        return entity
    }
}
