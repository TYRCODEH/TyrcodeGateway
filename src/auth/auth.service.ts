import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilePermissions } from './profile-permissions';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_SERVICE') private client: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async reate(createUserDto: any) {
    try {
      const user = await lastValueFrom(
        this.client.send('create_user', createUserDto),
      );

      if (!user) {
        throw new Error('this.globalTexts.userNotFound');
      }
      const payload = {
        sub: user.id,
        email: user.email,
      };

      console.log(payload, 'payloadpayloadpayload');

      const token = this.jwtService.sign(payload);

      return { access_token: token };
    } catch (error) {}
  }
}
