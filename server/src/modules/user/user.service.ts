import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    log(id: string) {
        console.log(id);
    }
}
