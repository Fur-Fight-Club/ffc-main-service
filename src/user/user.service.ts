import { Inject, Injectable } from '@nestjs/common';
import { LoginRequest, RegisterRequest, UserApi } from 'src/api/auth/user/user.interface';

@Injectable()
export class UserService {
  constructor(@Inject(UserApi) private userApi: UserApi) { }

  async login(params: LoginRequest) {
    return await this.userApi.login(params.email, params.password);
  }

  async register(params: RegisterRequest) {
    return await this.userApi.register(params.firstname, params.lastname, params.email, params.password);
  }

}
