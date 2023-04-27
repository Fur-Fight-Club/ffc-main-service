import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequest, LoginResponse, RegisterRequest, UserResponse } from 'src/api/auth/user/user.interface';

@Controller('user')
@ApiTags("User controller")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiBody({
    description: "Un utilisateur se connecte",
    type: LoginRequest
  })
  @ApiResponse({
    description: "L'utilisateur est connecté",
    type: LoginResponse
  })
  @Post('login')
  async login(
    @Body() body: LoginRequest
  ) {
    return await this.userService.login(body);
  }

  @ApiBody({
    description: "Un utilisateur s'inscrit",
    type: RegisterRequest
  })
  @ApiResponse({
    description: "L'utilisateur est inscrit",
    type: UserResponse
  })
  @Post('register')
  async register(
    @Body() body: RegisterRequest
  ) {
    return await this.userService.register(body);
  }
}
