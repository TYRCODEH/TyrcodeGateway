import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_SERVICE') private client: ClientProxy) {}

  create(createUserDto: CreateUserDto) {
    try {
      return lastValueFrom(this.client.send('create_user', createUserDto));
    } catch (error) {}
  }

  findAll() {
    try {
      return lastValueFrom(this.client.send('list_users', {}));
    } catch (error) {}
  }

  findOne(id: any) {
    return lastValueFrom(this.client.send('list_users_id', id));
  }

  update(id: any, updateUserDto: UpdateUserDto) {
    try {
      return lastValueFrom(
        this.client.send('update_users', { id, ...updateUserDto }),
      );
    } catch (error) {}
  }

  async remove(id: any) {
    return await lastValueFrom(this.client.send('delete_users', id));
  }
}
