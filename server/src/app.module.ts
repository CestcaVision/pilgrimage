import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { PostModule } from './modules/post/post.module';


@Module({
  imports: [UserModule, TypeOrmModule.forRoot(), PostModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }
