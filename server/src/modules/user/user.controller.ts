import { Controller, Get, Body, Post, Param, Put, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, updatePasswordDto } from './user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post()
    async store(@Body() data: createUserDto) {
        return await this.userService.store(data)
    }
    @Get()
    async index() {
        return await this.userService.index()
    }
    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async show(@Param('id') id: string) {
        return await this.userService.show(id)
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: createUserDto) {
        return await this.userService.update(id, data)
    }
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.remove(id)
    }
    @Put('password/:id')
    async updatePassword(@Param('id') id: string, @Body() data: updatePasswordDto) {
        return await this.userService.updatePassword(id, data)
    }
}
