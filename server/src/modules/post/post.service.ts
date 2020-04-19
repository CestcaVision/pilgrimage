import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { createPostDto } from './post.dto';

@Injectable()
export class PostService {
    constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) { }
    async store(data: createPostDto) {
        const entity = await this.postRepository.create(data)
        await this.postRepository.save(entity)
        return entity
    }
    async index() {
        const entities = await this.postRepository.find()
        return entities
    }
    async show(id: string) {
        const entity = await this.postRepository.findOne(id)
        return entity
    }
    async update(id: string, data: createPostDto) {
        const result = await this.postRepository.update(id, data)
        return result
    }
    async remove(id: string) {
        const result = await this.postRepository.delete(id)
        return result
    }
}
